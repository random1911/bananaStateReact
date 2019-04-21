import { types } from "mobx-state-tree";

const rules = types.model("GameRules", {
  startBalance: types.optional(types.number, 30000),
  allowance: types.optional(types.number, 5000),
  povertyLine: types.optional(types.number, 8000),
  minStockPrice: types.optional(types.number, 1000),
  minStockIncome: types.optional(types.number, 200)
});

export default rules;
