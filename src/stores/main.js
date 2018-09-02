import { types } from "mobx-state-tree";
import player from "./player";
import smallProperty from "./smallProperty";
import GameMap from "./map";
import Log from "./log";

const model = {
  isRunning: false,
  currentTurn: 0,
  rolled: false,
  activePlayer: types.maybe(types.reference(player)),
  players: types.optional(types.array(player), []),
  smallProperty: types.optional(types.array(smallProperty), []),
  gameMap: types.maybe(GameMap),
  playerMoving: false,
  log: types.optional(Log, { messages: [] })
};

const views = self => ({
  get isServer() {
    return typeof window === "undefined";
  },
  get activePlayerColor() {
    return self.activePlayer && self.activePlayer.color;
  },
  get activePlayerIndex() {
    return self.players.indexOf(self.activePlayer)
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
  initGame(players, map) {
    self.players = players;
    self.gameMap = map;
    self.currentTurn = 1;
    self.isRunning = true;
    self.gameMap.calculateSizes();
    self.activePlayer = self.players[0].id;
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
    self.rolled = value
  },
  getRollResult() {
    const min = 1;
    const max = 6;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  makeRoll() {
    const res = self.getRollResult();
    const message = {
      playerColor: self.activePlayerColor,
      caption: self.activePlayer.name,
      message: `has rolled ${res}`,
    };
    self.log.addMessage(message);
    self.activePlayer.move(res);
    self.setRollStatus(true)
  },
  endTurn() {
    self.currentTurn += 1
    const nextIndex = self.activePlayerIndex + 1
    const nextPlayerIndex = nextIndex >= self.players.length ? 0 : nextIndex
    const nextPlayer = self.players[nextPlayerIndex]
    self.activePlayer = nextPlayer.id
    if (self.activePlayer.isFrozen) {
      self.activePlayer.checkFrozen()
    }
    self.setRollStatus(false)
  },
});

const Store = types
  .model("MainStore", model)
  .views(views)
  .actions(actions);

export default Store;

/*

increase turn number
player can roll bones
on roll = get result
log player X rolls {result}
move player {result}
player can end turn

find current player index in players
find next player (last ? first : next)
next is frozen ? reduce frozen count and find next : player can roll
* */
