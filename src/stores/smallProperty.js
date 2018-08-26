import {types} from 'mobx-state-tree'

const smallProperty = types.model('smallProperty', {
  id: types.string,
  name: types.string,
  description: types.maybe(types.string),
  income: types.number,
  price: types.number,
  illegal: false,
  ownerId: types.maybe(types.string),
})

export default smallProperty