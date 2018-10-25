import { types, getRoot } from "mobx-state-tree";

const stock = types
  .model("StockModel", {
    price: types.number,
    priseStep: types.number,
    income: types.number,
    incomeStep: types.number,
    industry: types.enumeration("Industry", [
      "hiTech",
      "foodDrink",
      "automotive",
      "generalGoods"
    ])
    // TODO: how to deal with ownership?
  })
  .views(self => ({
    get store() {
      return getRoot(self);
    }
  }))
  .actions(self => ({
    changePrice(isPositive) {
      const { minStockPrice, minStockIncome } = self.store;
      const modifier = isPositive ? 1 : -1;
      const newPrice = self.price + modifier * self.priseStep;
      const newIncome = self.income + modifier * self.incomeStep;
      const aboveMinPrice = newPrice < minStockPrice;
      const aboveMinIncome = newIncome < minStockIncome;
      self.price = aboveMinPrice ? newPrice : minStockPrice;
      self.income = aboveMinIncome ? newIncome : minStockIncome;
    },
    increasePrice() {
      self.changePrice(true);
    },
    decreasePrice() {
      self.changePrice(false);
    }
  }));

export default stock;
