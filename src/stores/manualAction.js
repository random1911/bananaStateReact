import { types, getRoot } from "mobx-state-tree";

/*
available types:
buy small property


 */

const manualAction = types
  .model("ManualAction", {
    type: types.string, // buySmallProperty
    reference: types.maybe(types.string),
    caption: types.maybe(types.string),
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    },
    get isAvailable() {
      // TODO: don't let click on button then player don't have enough money and ect
      return true
    },
  }))
  .actions(self => ({
    handleAction() {
      switch (self.type) {
        case "buySmallProperty":
          self.buySmallProperty();
          break;
        default:
          break;
      }
    },
    buySmallProperty() {
      if (!self.reference) {
        console.error("buySmallProperty: reference was not provided");
        return;
      }
      const property = self.store.findSmallProperty(self.reference);
      const player = self.store.activePlayer
      if (!property.ownerId && player.balance >= property.price) {
        player.looseMoney(property.price, `buying the "${property.name}"`)
        property.setOwner(player.id);
      }

    }
  }));

export const emptyManualAction = {
  type: ""
}

export default manualAction;