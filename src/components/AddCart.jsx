import React, { useReducer, useContext, useRef } from 'react'
import CartsContext from '../context/carts-context'

const initialState = {
  id: 0,
  total: 0,
  userId: 0,
  products: [],
  totalProducts: 0,
  totalQuantity: 0,
  discountedTotal: 0,
}

const reducer = (state, action) => {
  if (action.type === 'ADD_PRODUCT') {
    const newProduct = {
      id: Date.now(),
      title: action.payload.title,
      price: action.payload.price,
      total: action.payload.total,
      quantity: action.payload.quantity,
      discountPercentage: action.payload.discount,
      discountedPrice: action.payload.discountedPrice,
    }

    const updatedProducts = [...state.products, newProduct]
    const uniqueProducts = new Set(updatedProducts.map((item) => item.title))
    const totalProducts = uniqueProducts.size
    const totalQuantity = updatedProducts.reduce(
      (acc, item) => acc + item.quantity,
      0
    )
    const totalDiscount = updatedProducts.reduce(
      (acc, item) => acc + (item.total - item.discountedPrice),
      0
    )

    const total = updatedProducts.reduce((acc, item) => acc + item.total, 0)
    const discountedTotal = total - totalDiscount
    return {
      ...state,
      id: action.payload.lastId,
      products: updatedProducts,
      totalProducts,
      totalQuantity,
      total,
      discountedTotal,
      userId: action.payload.userId,
    }
  } else return state
}

const AddCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const ctx = useContext(CartsContext)
  const { addCart, carts } = ctx

  const titleRef = useRef()
  const priceRef = useRef()
  const quantityRef = useRef()
  const discountRef = useRef()

  const lastId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 0
  const randomNumber = () => Math.floor(Math.random() * 100)
  const userId = randomNumber()

  const addCartHandler = (item) => {
    addCart(item)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const title = titleRef.current.value
    const price = parseInt(priceRef.current.value)
    const quantity = parseInt(quantityRef.current.value)
    const discount = parseInt(discountRef.current.value)
    const total = price * quantity
    const discountedPrice = Math.ceil(total - (total * discount) / 100)

    dispatch({
      type: 'ADD_PRODUCT',
      payload: {
        lastId,
        title,
        price,
        total,
        quantity,
        discount,
        discountedPrice,
        userId,
      },
    })

    event.target.reset()
  }

  return (
    <div>
      <h1>Product Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          name='title'
          ref={titleRef}
          required
        />

        <label htmlFor='price'>Price:</label>
        <input
          type='number'
          id='price'
          name='price'
          step='1'
          min='0'
          ref={priceRef}
          required
        />

        <label htmlFor='quantity'>Quantity:</label>
        <input
          type='number'
          id='quantity'
          name='quantity'
          step='1'
          min='1'
          max='10'
          ref={quantityRef}
          required
        />

        <label htmlFor='discount'>Discount:</label>
        <input
          type='number'
          id='discount'
          name='discount'
          step='1'
          min='0'
          max='100'
          ref={discountRef}
          required
        />

        <button type='submit'>Add Product</button>
      </form>

      <h2>Cart Summary</h2>
      <p>Total Unique Products: {state.totalProducts}</p>
      <p>Total Quantity: {state.totalQuantity}</p>
      <p>Total Price: {state.total}</p>
      <p>Total Price with Discount: {state.discountedTotal}</p>

      <h2>Cart Items</h2>
      <ul>
        {state.products.map((product) => (
          <li key={product.id}>
            {product.title} ({product.quantity} x {product.price}) -{' '}
            {product.discountPercentage}% off = {product.discountedPrice}
          </li>
        ))}
      </ul>
      <button onClick={() => addCartHandler(state)}>Add Cart</button>
    </div>
  )
}

export default AddCart
