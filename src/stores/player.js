import { types, getRoot } from "mobx-state-tree";
import { availableColors } from "./colors";
import smallProperty from "./smallProperty";
import { coordinates } from "./map";
import stats from "./playerStats";

const player = types
  .model("playerModel", {
    id: types.identifier,
    color: availableColors,
    position: types.optional(coordinates, { x: 1, y: 1 }),
    name: types.string,
    balance: types.number,
    smallPropertyList: types.optional(types.array(smallProperty), []),
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
    }
  }))
  .actions(self => ({
    checkFrozen() {
      const message = {
        playerColor: self.color,
        caption: self.name
      };
      if (self.frozenTurnsCount <= 0 || !self.isFrozen) {
        self.isFrozen = false;
        message.message = "is no longer inactive";
        self.frozenStatus = "";
        self.store.log.addMessage(message);
        return;
      }
      self.frozenTurnsCount -= 1;
      message.message =
        self.frozenTurnsCount === 0
          ? "will be active next turn"
          : `will be inactive ${self.frozenTurnsCount} more turns`;
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
      const message = {
        playerColor: self.color,
        caption: self.name,
        message: `become inactive for ${duration} turns${
          reason ? ` because of ${reason}` : "."
        }`
      };
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
        ` and went to tile ${currentTile.id} ${currentTile.caption}`
      );
      currentTile.event && currentTile.event.check();
    },
    onNewRound() {
      self.stats.increaseRoundsCount();
    },
    move(number) {
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
            self.onNewRound();
          }
          if (index + 1 === path.length) {
            self.onEndMoving();
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
    getMoney(number, reason) {
      const message = {
        playerColor: self.color,
        caption: self.name,
        message: `got $${number} in the reason of ${reason}`
      };
      self.store.log.addMessage(message);
      self.changeBalance(number);
    },
    looseMoney(number, reason) {
      const message = {
        playerColor: self.color,
        caption: self.name,
        message: `lost $${number} in the reason of ${reason}`
      };
      self.store.log.addMessage(message);
      self.changeBalance(number);
    }
  }));

export default player;
