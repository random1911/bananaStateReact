import { types, applySnapshot } from "mobx-state-tree";
import { t } from "i18next";
import player from "./player";
import smallProperty from "./smallProperty";
import GameMap from "./map";
import Log from "./log";
import manualAction, { emptyManualAction } from "./manualAction";
import rules from "./rules";
import ui from "./ui";

const model = {
  isRunning: false,
  currentTurn: 0,
  rolled: false,
  activePlayer: types.maybe(types.reference(player)),
  players: types.optional(types.array(player), []),
  smallProperty: types.optional(types.array(smallProperty), []),
  gameMap: types.maybe(GameMap),
  manualAction: types.optional(manualAction, emptyManualAction),
  playerMoving: false,
  log: types.optional(Log, { messages: [] }),
  rules: types.optional(rules, {}),
  ui: types.optional(ui, {})
};

const views = self => ({
  get isServer() {
    return typeof window === "undefined";
  },
  get activePlayerColor() {
    return self.activePlayer && self.activePlayer.color;
  },
  get activePlayerIndex() {
    return self.players.indexOf(self.activePlayer);
  },
  get playersCount() {
    return self.players.length;
  }
});

const actions = self => ({
  afterCreate() {
    if (!self.isServer) {
      window.store = self;
    }
  },
  initGame({ players, map, smallProperty }) {
    self.players = players;
    self.gameMap = map;
    self.smallProperty = smallProperty;
    self.currentTurn = 1;
    self.isRunning = true;
    self.gameMap.calculateSizes();
    self.activePlayer = self.players[0].id;
  },
  setManualAction(action) {
    applySnapshot(self.manualAction, action);
  },
  clearManualAction() {
    applySnapshot(self.manualAction, emptyManualAction);
  },
  teleportPlayer(coordinates, playerId) {
    const player = playerId
      ? self.players.find(player => player.id === playerId)
      : self.activePlayer;
    player.position = coordinates;
  },
  setPlayerMoving(value = false) {
    self.playerMoving = value;
  },
  setRollStatus(value = false) {
    self.rolled = value;
  },
  getRollResult() {
    const min = 1;
    const max = 6;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  makeRoll() {
    const roll = self.getRollResult();
    const message = t("log.rolled", { roll });
    self.log.addMessage(message);
    self.activePlayer.move(roll);
    self.setRollStatus(true);
  },
  endTurn() {
    self.currentTurn += 1;
    const nextIndex = self.activePlayerIndex + 1;
    const nextPlayerIndex = nextIndex >= self.players.length ? 0 : nextIndex;
    const nextPlayer = self.players[nextPlayerIndex];
    self.activePlayer = nextPlayer.id;
    if (self.activePlayer.isFrozen) {
      self.activePlayer.checkFrozen();
    }
    self.setRollStatus(false);
    self.clearManualAction();
  },
  findSmallProperty(id) {
    return self.smallProperty.find(property => property.id === id);
  }
});

const Store = types
  .model("MainStore", model)
  .views(views)
  .actions(actions);

export default Store;
