import { types, getRoot } from "mobx-state-tree";

const logMessage = types.model("LogMessage", {
  id: types.identifierNumber,
  turn: types.number,
  playerColor: types.maybe(types.string),
  caption: types.maybe(types.string),
  message: types.maybe(types.string)
  // TODO: type to filter events
});

const log = types
  .model("Log", {
    messages: types.optional(types.array(logMessage), [])
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    }
  }))
  .actions(self => ({
    addMessage(message) {
      const newMessage = {
        id: self.messages.length + 1,
        turn: self.store.currentTurn,
        playerColor: self.store.activePlayer.color,
        caption: self.store.activePlayer.name,
        message
      };
      self.messages = [...self.messages, newMessage];
    },
    addToLast(text) {
      if (!self.messages.length) return;
      const lastMessage = self.messages[self.messages.length - 1];
      const current = lastMessage.message;
      lastMessage.message = current + text;
    }
  }));

export default log;
