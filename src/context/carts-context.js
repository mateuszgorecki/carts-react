import React from 'react'

const CartsContext = React.createContext({
  isCartAdded: false,
  toggleIsAdded: () => { },
  carts: [],
  deleteCart: (id) => { },
  addCart: () => { },
})

export default CartsContext