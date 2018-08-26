import {types} from 'mobx-state-tree'

export const availableColors = types.enumeration("Color", ["red", "blue", "green"])

const colors = types.model('ColorsModel', {
  list: types.array(availableColors)
})

export default colors