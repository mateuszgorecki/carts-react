import React from 'react'

const CartsContext = React.createContext({
  carts: [],
  deleteCart: (id) => { },
  addCart: () => { },
})

export default CartsContext