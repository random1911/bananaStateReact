import { types, getRoot } from "mobx-state-tree";
import modal from "./modal";

export const disableScrollClassName = 'disable-scroll'

const ui = types
  .model("ui", {
    modals: types.optional(types.array(modal), []),
    dropdownIsOpen: false
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    },
    findModal(id) {
      return self.modals.find(modal => id === modal.id);
    },
    get haveOpenedPopups() {
      const openedModals = self.modals.filter(modal => modal.isOpen).length
      return openedModals // TODO openedMobileMenu if it will
    },
  }))
  .actions(self => ({
    addModal(id) {
      self.modals = [...self.modals, { id }];
    },
    openModal(id) {
      self.findModal(id).open();
    },
    closeModal(id) {
      self.findModal(id).close();
    },
    disableBodyScroll() {
      if (self.store.isServer) return
      const {body, documentElement} = document
      body.classList.add(disableScrollClassName)
      documentElement.classList.add(disableScrollClassName)
    },

    enableBodyScroll() {
      if (self.store.isServer || self.haveOpenedPopups) return
      const {body, documentElement} = document
      body.classList.remove(disableScrollClassName)
      documentElement.classList.remove(disableScrollClassName)
    },

    onDropdownOpen() {
      self.dropdownIsOpen = true
      !self.haveOpenedPopups && self.disableBodyScroll()
    },

    onDropdownClose() {
      self.dropdownIsOpen = false
      !self.haveOpenedPopups && self.enableBodyScroll()
    },

  }));

export default ui;
