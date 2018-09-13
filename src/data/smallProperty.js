// function smallPropery(id, name, description, income, price, illegal = false) {
//   return {
//     id,
//     name,
//     description,
//     income,
//     price,
//     illegal,
//     ownerId: null
//   }
// }

/*
* {
    id: '',
    name: '',
    description: '',
    income: 0,
    price: 0,
    illegal: false
  },
* */

const smallPropertyList = [
  {
    id: 'erudito',
    name: '"Erudito" bookstore',
    description: 'a small bookstore',
    income: 1500,
    price: 5000,
    illegal: false
  },
  {
    id: 'madAntonio',
    name: 'Mad Antonio saloon',
    description: 'Popular backstreet bar',
    income: 3500,
    price: 8000,
    illegal: true
  },
  {
    id: 'StMichelPharmacy',
    name: 'St. Michel pharmacy',
    description: 'Pharmacy store',
    income: 2000,
    price: 6000,
    illegal: false
  },
  {
    id: 'cockFights',
    name: 'Cock-fights',
    description: 'Underground cock-fights club',
    income: 4500,
    price: 11000,
    illegal: true
  }

];

export default smallPropertyList