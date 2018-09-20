import { types, getRoot } from "mobx-state-tree";
import modal from "./modal";

const ui = types
  .model("ui", {
    modals: types.optional(types.array(modal), [])
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    },
    findModal(id) {
      return self.modals.find(modal => id === modal.id);
    }
  }))
  .actions(self => ({
    addModal(id) {
      self.modals = [...self.modals, { id }];
    },
    openModal(id) {
      self.findModal(id).open()
    },
    closeModal(id) {
      self.findModal(id).close()
    }
  }));

export default ui;
