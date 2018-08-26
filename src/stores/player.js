import {types, getRoot} from 'mobx-state-tree'
import {generateDate} from "../helpers/helpers"
import {availableColors} from './colors'
import smallProperty from './smallProperty'
import {coordinates} from './map'

const playerModel = {
  id: types.identifier,
  color: availableColors,
  position: types.optional(coordinates, {x: 1, y: 1}),
  name: types.string,
  balance: types.number,
  smallPropertyList: types.optional(types.array(smallProperty), []),
  isFrozen: false,
  frozenStatus: types.maybe(types.string),
  frozenTurnsCount: types.optional(types.number, 0),
}

const playerViews = self => ({
  get store() {
    return getRoot(self)
  },
  get formattedBalance() {
    return self.balance.toLocaleString()
  }
})

const playerActions = self => ({
  checkFrozen() {
    const message = {
      id: `${generateDate()}${self.color}`,
      turn: self.store.currentTurn,
      playerColor: self.color,
      caption: self.name,
    }
    if (self.frozenTurnsCount <= 0 || self.isFrozen) {
      self.isFrozen = false
      message.message = 'is no longer inactive'
      self.frozenStatus = ''
    } else {
      self.frozenTurnsCount -= 1
      message.message = `will be inactive ${self.frozenTurnsCount} more turns`
    }
    self.store.log.addMessage(message)
    self.endTurn()
  },
  setNewPosition(x, y) {
    self.position.x = x
    self.position.y = y
  },
  move(number) {
    self.store.setPlayerMoving(true)
    const getNextTiles = currentTile => self.store.gameMap.getTile(currentTile).next
    let currentPos = self.position
    let path = [currentPos]
    while(number > 0) {
      const next = getNextTiles(currentPos)
      if (next.length === 1) {
        currentPos = next[0]
        path = [...path, currentPos]
      }
      number -= 1
    }
    // console.dir(path)
    const delay = 300
    path.forEach((item, index) => {
      setTimeout(() => {
        self.setNewPosition(item.x, item.y)
        index + 1 === path.length && self.store.setPlayerMoving(false)
      }, delay * index)
    })
  },
})

const player = types
  .model('playerModel', playerModel)
  .views(playerViews)
  .actions(playerActions)

export default player