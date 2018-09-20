import { types } from "mobx-state-tree";

const rules = types.model("GameRules", {
  startBalance: types.optional(types.number, 30000),
  allowance: types.optional(types.number, 5000),
  povertyLine: types.optional(types.number, 8000)
});

export default rules;
