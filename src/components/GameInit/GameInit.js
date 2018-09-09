import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {
  Wrapper,
} from "./GameInitStyled"

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
  }
}

const playersSnap = [
  createPlayer('red', 'John'),
  createPlayer('blue', 'Pablo')
]

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

const mapSnap = {
  start: {x: 1, y: 1},
  tiles: [
    {
      id: 1,
      caption: 'Start',
      description: '',
      position: {
        x: 1, y: 1
      },
      prev: [{x: 2, y: 1}],
      next: [{x: 1, y: 2}],
    },
    {
      id: 2,
      caption: '',
      description: '',
      position: {x: 1, y: 2},
      prev: [{x: 1, y: 1}],
      next: [{x: 1, y: 3}],
    },
    {
      id: 3,
      caption: 'Police',
      description: 'You got arrested for 2 turns',
      position: {x: 1, y: 3},
      prev: [{x: 1, y: 2}],
      next: [{x: 2, y: 3}],
      event: {
        type: 'freeze',
        value: 2,
        text: 'Jailed'
      }
    },
    {
      id: 4,
      caption: 'Lucky lottery',
      description: '',
      position: {x: 2, y: 3},
      prev: [{x: 1, y: 3}],
      next: [{x: 3, y: 3}],
      event: {
        type: 'getMoney',
        value: 2000,
        text: 'won a lottery'
      }
    },
    {
      id: 5,
      caption: '',
      description: '',
      position: {x: 3, y: 3},
      prev: [{x: 2, y: 3}],
      next: [{x: 4, y: 3}],
    },
    {
      id: 6,
      caption: 'Trauma',
      description: 'Ouch! You have broke your leg',
      position: {x: 4, y: 3},
      prev: [{x: 3, y: 3}],
      next: [{x: 4, y: 2}],
      event: {
        type: 'freeze',
        value: 2,
        text: 'Broke leg'
      }
    },
    {
      id: 7,
      caption: '',
      description: '',
      position: {x: 4, y: 2},
      prev: [{x: 4, y: 3}],
      next: [{x: 4, y: 1}],
    },
    {
      id: 8,
      caption: '',
      description: '',
      position: {x: 4, y: 1},
      prev: [{x: 4, y: 2}],
      next: [{x: 3, y: 1}],
    },
    {
      id: 9,
      caption: 'It\'s a robbery!',
      description: '',
      position: {x: 3, y: 1},
      prev: [{x: 4, y: 1}],
      next: [{x: 2, y: 1}],
      event: {
        type: 'looseMoney',
        value: 1000,
        text: 'robbery'
      }
    },
    {
      id: 10,
      caption: '',
      description: '',
      position: {x: 2, y: 1},
      prev: [{x: 3, y: 1}],
      next: [{x: 1, y: 1}],
    },
  ]
}

/*

  * */

const GameInit = ({store}) => {
  const init = () => {
    store.initGame(playersSnap, mapSnap)
  }
  return (
    <Wrapper>
      <button onClick={init}>QuickStart</button>
    </Wrapper>
  )
}

GameInit.propTypes = {
  store: PropTypes.object.isRequired,
}

export default inject('store')(observer(GameInit))