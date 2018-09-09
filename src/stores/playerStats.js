import { types, getRoot } from "mobx-state-tree";

const stats = types
  .model("Stats", {
    rounds: types.optional(types.number, 0),
    moneyEarned: types.optional(types.number, 0),
    moneySpent: types.optional(types.number, 0)
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    }
  }))
  .actions(self => ({
    increaseRoundsCount() {
      self.rounds += 1;
    },
    addMoneyEarned(number) {
      if (typeof number !== "number") {
        console.error(`Stats addMoneyEarned: ${number} is not a number`);
        return;
      }
      self.moneyEarned += number;
    },
    addMoneySpent(number) {
      if (typeof number !== "number") {
        console.error(`Stats addMoneySpent: ${number} is not a number`);
        return;
      }
      self.moneySpent += number >= 0 ? number : number * -1;
    }
  }));

export default stats