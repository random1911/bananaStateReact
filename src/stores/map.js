import { types, getRoot } from "mobx-state-tree";
import { t } from "i18next";
import event from "./event";
import smallProperty from "./smallProperty";

export const coordinates = types.model("Coordinates", {
  x: types.number,
  y: types.number,
  caption: types.maybe(types.string)
});

const tile = types
  .model("tilesModel", {
    id: types.number,
    caption: types.maybe(types.string),
    description: types.maybe(types.string),
    position: coordinates,
    next: types.array(coordinates),
    prev: types.array(coordinates),
    event: types.maybe(event),
    smallProperty: types.maybe(types.reference(smallProperty))
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    },
    get players() {
      const players = self.store.players;
      const playersOnMap = players.filter(
        player =>
          player.position.x === self.position.x &&
          player.position.y === self.position.y
      );
      return playersOnMap.map(item => ({ color: item.color, name: item.name }));
    },
    get borders() {
      const prevY = self.prev.map(item => item.y);
      const nextY = self.next.map(item => item.y);
      const prevX = self.prev.map(item => item.x);
      const nextX = self.next.map(item => item.x);
      const pos = self.position;
      const getMax = arr => Math.max(...arr);
      const haveTopBorder = () => {
        return getMax(prevY) >= pos.y && getMax(nextY) >= pos.y;
      };
      const HaveBottomBorder = () => {
        return getMax(prevY) <= pos.y && getMax(nextY) <= pos.y;
      };
      const HaveLeftBorder = () => {
        return getMax(prevX) >= pos.x && getMax(nextX) >= pos.x;
      };
      const HaveRightBorder = () => {
        return getMax(prevX) <= pos.x && getMax(nextX) <= pos.x;
      };
      return {
        top: haveTopBorder(),
        bottom: HaveBottomBorder(),
        left: HaveLeftBorder(),
        right: HaveRightBorder()
      };
    }
  }))
  .actions(self => ({
    afterCreate() {
      if (self.smallProperty) {
        console.log(self.smallProperty);
        self.setSmallProperty();
      }
    },

    setSmallProperty() {
      const { name, description, id } = self.smallProperty;
      self.caption = name;
      self.description = description;
      self.event = {
        type: "manual",
        manualAction: {
          type: "buySmallProperty",
          reference: id,
          caption: t("actions.buyButtonText", { name })
        }
      };
    }
  }));

const GameMap = types
  .model("MapModel", {
    tiles: types.array(tile),
    height: types.maybe(types.number),
    width: types.maybe(types.number),
    start: types.maybe(coordinates)
  })
  .actions(self => ({
    calculateSizes() {
      const rows = self.tiles.map(item => item.position.y);
      const cols = self.tiles.map(item => item.position.x);
      const height = Math.max(...rows);
      const width = Math.max(...cols);
      self.height = height;
      self.width = width;
    },
    getTile(position) {
      return self.tiles.find(
        tile => tile.position.x === position.x && tile.position.y === position.y
      );
    },
    checkOnStart(coordinates) {
      return coordinates.x === self.start.x && coordinates.y === self.start.y;
    }
  }));

export default GameMap;
