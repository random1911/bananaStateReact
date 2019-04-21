import { types, getRoot } from "mobx-state-tree";
import { t } from "i18next";
/*
available types:
buy small property


 */

const manualAction = types
  .model("ManualAction", {
    type: types.string, // buySmallProperty
    reference: types.maybe(types.string),
    caption: types.maybe(types.string)
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    },
    get isSmallPropertyAvailable() {
      const property =
        self.reference && self.store.findSmallProperty(self.reference);
      const player = self.store.activePlayer;
      return property && !property.ownerId && property.price <= player.balance;
    },
    get isAvailable() {
      switch (self.type) {
        case "buySmallProperty":
          return self.isSmallPropertyAvailable;
        default:
          return true;
      }
    }
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
      const player = self.store.activePlayer;
      if (!property.ownerId && player.balance >= property.price) {
        player.looseMoney(
          property.price,
          ` ${t("log.buyingProperty", { name: property.name })}`
        );
        property.setOwner(player.id);
      }
    }
  }));

export const emptyManualAction = {
  type: ""
};

export default manualAction;
