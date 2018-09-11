import { types, getRoot } from "mobx-state-tree";

const event = types
  .model("Event", {
    type: types.string,
    manual: false,
    value: types.maybe(types.number),
    text: types.maybe(types.string)
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
        case "buySmallProperty":
          //TODO!
          console.log('Do manual action button!');
          break;
        default:
          return;
      }
    }
  }));

export default event;
