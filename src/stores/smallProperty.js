import { types, getRoot } from "mobx-state-tree";

const smallProperty = types
  .model("smallProperty", {
    id: types.identifier,
    name: types.string,
    description: types.maybe(types.string),
    income: types.number,
    price: types.number,
    illegal: false,
    ownerId: types.maybe(types.string)
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    }
  }))
  .actions(self => ({
    setOwner(ownerId) {
      self.ownerId = ownerId;
    }
  }));

export default smallProperty;
