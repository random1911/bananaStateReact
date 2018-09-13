import { types, getRoot } from "mobx-state-tree";
import manualAction from "./manualAction"

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
      const player = self.store.activePlayer;
      switch (self.type) {
        case "freeze":
          player.freeze(self.value, self.text);
          break;
        case "getMoney":
          player.getMoney(self.value, self.text);
          break;
        case "lostMoney":
          player.looseMoney(self.value, self.text);
          break;
        case "manual":
          self.store.setManualAction(self.manualAction);
          break;
        default:
          return;
      }
    }
  }));

export default event;
