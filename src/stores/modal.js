import { types, getRoot } from "mobx-state-tree";

const modal = types
  .model("Modal", {
    isOpen: false,
    id: types.identifier
  })
  .views(self => ({
    get store() {
      return getRoot(self)
    }
  }))
  .actions(self => ({
    open() {
      self.isOpen = true;
    },
    close() {
      self.isOpen = false;
    }
  }));

export default modal;
