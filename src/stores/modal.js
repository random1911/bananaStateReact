import { types } from "mobx-state-tree";

const modal = types
  .model("Modal", {
    isOpen: false,
    id: types.identifier
  })
  .actions(self => ({
    toggleVisibility() {
      self.isOpen = !self.isOpen;
    },
    open() {
      self.isOpen = true;
    },
    close() {
      self.isOpen = false;
    }
  }));

export default modal;
