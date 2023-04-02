import { useState, useEffect } from 'react'
import CartsContext from './carts-context'

const CartsProvider = (props) => {
  const [carts, setCarts] = useState([])
  const [addedCart, setAddedCart] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('https://dummyjson.com/carts')
      if (res.status !== 200) {
        throw new Error('Something went wrong')
      } else if (res.status === 404) {
        throw new Error('404 not found')
      }
      const data = await res.json()
      setCarts(data.carts)
    })()
  }, [])

  const addCartHandler = async (item) => {
    const res = await fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
    const data = await res.json()
    setCarts([...carts, item])
    setAddedCart(true)
    console.log('cart', data)
  }

  const deleteCartHandler = async (id) => {
    setCarts(carts.filter((cart) => cart.id !== id))
    const res = await fetch(`https://dummyjson.com/carts/${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    console.log('deleted cart', data)
  }

  const cartContext = {
    isCartAdded: addedCart,
    toggleIsAdded: setAddedCart,
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
