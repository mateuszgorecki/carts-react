import React from 'react'

const CartsContext = React.createContext({
  carts: [],
  deleteCart: () => { },
  addCart: () => { },
})

export default CartsContext