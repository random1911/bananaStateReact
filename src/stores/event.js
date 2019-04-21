import { types, getRoot } from "mobx-state-tree";
import manualAction from "./manualAction";

const event = types
  .model("Event", {
    type: types.string,
    value: types.maybe(types.number),
    text: types.maybe(types.string),
    manualAction: types.maybe(manualAction)
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    }
  }))
  .actions(self => ({
    check() {
      const { type, value, text, store, manualAction } = self;
      const player = store.activePlayer;
      switch (type) {
        case "freeze":
          player.freeze(value, text);
          break;
        case "getMoney":
          player.getMoney(value, text);
          break;
        case "lostMoney":
          player.looseMoney(value, text);
          break;
        case "manual":
          store.setManualAction(manualAction);
          break;
        default:
          return;
      }
    }
  }));

export default event;
