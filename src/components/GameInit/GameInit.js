import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Wrapper } from "./GameInitStyled";
import smallProperty from "../../data/smallProperty"
import testMap from "../../data/testMap"

function createPlayer(color, name) {
  return {
    color,
    name,
    id: color,
    balance: 10000,
    stats: {
      rounds: 0,
      moneySpent: 0,
      moneyEarned: 0
    }
  };
}

const playersSnap = [
  createPlayer("red", "John"),
  createPlayer("blue", "Pablo")
];

/*
id: types.number,
  caption: types.string,
  description: types.string,
  players: types.optional(types.array(availableColors), []),
  position: types.array(types.number),
  next: types.array(types.array(types.number)),
 */

/*
11 21 31 41
12 ** ** 42
13 23 33 43

id: types.number,
  caption: types.string,
  description: types.string,
  players: types.optional(types.array(availableColors), []),
  position: coordinates,
  next: types.array(coordinates),

* */

const GameInit = ({ store }) => {
  const init = () => {
    const snap = {
      players: playersSnap,
      map: testMap,
      smallProperty
    };
    store.initGame(snap);
  };
  return (
    <Wrapper>
      <button onClick={init}>QuickStart</button>
    </Wrapper>
  );
};

GameInit.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(GameInit));
