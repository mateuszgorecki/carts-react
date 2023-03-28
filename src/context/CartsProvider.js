import { useState, useEffect } from 'react'
import CartsContext from './carts-context'

const CartsProvider = (props) => {
  const [carts, setCarts] = useState([])

  useEffect(() => {
    const fetchCarts = async () => {
      const res = await fetch('https://dummyjson.com/carts')
      const data = await res.json()
      console.log(data)
      setCarts(data.carts)
    }
    fetchCarts()
  }, [])

  const addCartHandler = () => {}

  const deleteCartHandler = (id) => {}

  const cartContext = {
    carts: carts,
    deleteCart: deleteCartHandler,
    addCart: addCartHandler,
  }

  return (
    <CartsContext.Provider value={cartContext}>
      {props.children}
    </CartsContext.Provider>
  )
}

export default CartsProvider