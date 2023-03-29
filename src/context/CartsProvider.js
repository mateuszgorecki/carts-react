import { useState, useEffect } from 'react'
import CartsContext from './carts-context'

const CartsProvider = (props) => {
  const [carts, setCarts] = useState([])

  useEffect(() => {
    const fetchCarts = async () => {
      const res = await fetch('https://dummyjson.com/carts')
      const data = await res.json()
      console.log(data.carts)
      setCarts(data.carts)
    }
    fetchCarts()
  }, [])

  const addCartHandler = (item) => {
    setCarts([...carts, item])
  }

  const deleteCartHandler = (id) => {
    setCarts(carts.filter((cart) => cart.id !== id))
  }

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
