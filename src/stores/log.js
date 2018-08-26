import {types, getRoot} from 'mobx-state-tree'

const logMessage = types.model('LogMessage', {
  id: types.identifier,
  turn: types.number,
  playerColor: types.maybe(types.string),
  caption: types.maybe(types.string),
  message: types.maybe(types.string),
  // TODO: type to filter events
})

const log = types
  .model('Log', {
    messages: types.optional(types.array(logMessage), [])
  })
  .views(self => ({
    get store() {
      return getRoot(self)
    },
  }))
  .actions(self => ({
    addMessage(mesage) {
      self.messages = [...self.messages, mesage]
    }
  }))

export default log