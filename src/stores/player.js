import { types, getRoot } from "mobx-state-tree";
import { t } from "i18next";
import { availableColors } from "./colors";
import { coordinates } from "./map";
import stats from "./playerStats";

const player = types
  .model("playerModel", {
    id: types.identifier,
    color: availableColors,
    position: types.optional(coordinates, { x: 1, y: 1 }),
    name: types.string,
    balance: types.number,
    // smallPropertyList: types.optional(types.array(smallProperty), []),
    isFrozen: false,
    frozenStatus: types.maybe(types.string),
    frozenTurnsCount: types.optional(types.number, 0),
    stats: stats
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    },
    get formattedBalance() {
      return self.balance.toLocaleString();
    },
    get smallProperty() {
      return self.store.smallProperty.filter(
        property => property.ownerId === self.id
      );
    },
    get income() {
      if (!self.smallProperty.length) return 0;
      const income = self.smallProperty.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.income;
      }, 0);
      return income;
    },
    get formattedIncome() {
      return self.income.toLocaleString();
    },
    get hasIncome() {
      return self.income > 0;
    },
    get isNeedy() {
      return self.income <= self.store.rules.povertyLine;
    },
    get isActiveNow() {
      return self.store.activePlayer.id === self.id;
    },
    get currentStatus() {
      if (self.isFrozen)
        return t("playerInfo.frozenDesc", {
          reason: self.frozenStatus,
          count: self.frozenTurnsCount
        });
      if (self.isActiveNow) return t("playerInfo.makingTurn");
      if (!self.isActiveNow) return t("playerInfo.waitingForTurn");
    }
  }))
  .actions(self => ({
    checkFrozen() {
      if (self.frozenTurnsCount <= 0 || !self.isFrozen) {
        self.isFrozen = false;
        const message = t("log.notInactive");
        self.frozenStatus = "";
        self.store.log.addMessage(message);
        return;
      }
      self.frozenTurnsCount -= 1;
      const message =
        self.frozenTurnsCount === 0
          ? t("log.willBeActiveNext")
          : t("log.willBeActiveIn", { count: self.frozenTurnsCount });
      self.store.log.addMessage(message);
      self.store.endTurn();
    },
    freeze(duration = 1, reason) {
      if (duration <= 1) return;
      self.isFrozen = true;
      self.frozenTurnsCount = duration;
      if (reason) {
        self.frozenStatus = reason;
      }
      const message = `${t("log.frozenIntro", { duration })}${
        reason ? t("log.frozenReason", { reason }) : ""
      }.`;
      self.store.log.addMessage(message);
    },
    setNewPosition(x, y) {
      self.position.x = x;
      self.position.y = y;
    },
    onStartMoving() {
      self.store.setPlayerMoving(true);
    },
    onEndMoving() {
      self.store.setPlayerMoving(false);
      const currentTile = self.store.gameMap.getTile(self.position);
      self.store.log.addToLast(
        ` ${t("log.wentToTile")} ${currentTile.id} ${currentTile.caption}`
      );
      currentTile.event && currentTile.event.check();
    },
    onNewRound() {
      self.stats.increaseRoundsCount();
      self.getIncome();
    },
    move(number) {
      let newRound;
      self.onStartMoving();
      const getNextTiles = currentTile =>
        self.store.gameMap.getTile(currentTile).next;
      let currentPos = self.position;
      let path = [currentPos];
      while (number > 0) {
        const next = getNextTiles(currentPos);
        if (next.length === 1) {
          currentPos = next[0];
          path = [...path, currentPos];
        }
        number -= 1;
      }
      // console.dir(path)
      const delay = 300;
      path.forEach((item, index) => {
        setTimeout(() => {
          self.setNewPosition(item.x, item.y);
          if (index > 0 && self.store.gameMap.checkOnStart(item)) {
            newRound = true;
          }
          if (index + 1 === path.length) {
            self.onEndMoving();
            newRound && self.onNewRound();
          }
        }, delay * index);
      });
    },
    changeBalance(number) {
      self.balance += number;
      number >= 0
        ? self.stats.addMoneyEarned(number)
        : self.stats.addMoneySpent(number);
    },
    getMoney(number, message) {
      const info = t("log.gotMoney", { number });
      self.store.log.addMessage(info);
      message && self.store.log.addToLast(message);
      self.changeBalance(number);
    },
    looseMoney(number, message) {
      const info = t("log.lostMoney", { number });
      self.store.log.addMessage(info);
      message && self.store.log.addToLast(message);
      self.changeBalance(-number);
    },
    getIncome() {
      let income = self.income;
      if (self.isNeedy) {
        income += self.store.rules.allowance;
      }
      let message;
      if (self.isNeedy && self.hasIncome) {
        message = ` ${t("log.incomePropertyAllowance")}`;
      }
      if (!self.hasIncome) {
        message = ` ${t("log.incomeAllowance")}`;
      }
      if (!self.isNeedy && self.hasIncome) {
        message = ` ${t("log.incomeProperty")}`;
      }
      self.getMoney(income, message);
    }
  }));

export default player;
