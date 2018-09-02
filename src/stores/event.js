import {types, getRoot} from 'mobx-state-tree'

const event = types
  .model('Event', {
    type: types.string,
    manual: false,
    value: types.maybe(types.number),
    text: types.maybe(types.string),
  })
  .views(self => ({
    get store() {
      return getRoot(self)
    }
  }))
  .actions(self => ({
    check() {
      switch (self.type) {
        case 'freeze':
          self.store.activePlayer.freeze(self.value, self.text);
        break
        default:
          return
      }
    }
  }))

export default event