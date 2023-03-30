import React, { useReducer, useContext, useRef } from 'react'
import CartsContext from '../context/carts-context'
import LayoutWrapper from './LayoutWrapper'

import styles from '../styles/AddCart.module.scss'

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

  const isDisabled = state.products.length > 0 ? false : true

  const titleRef = useRef()
  const priceRef = useRef()
  const quantityRef = useRef()
  const discountRef = useRef()

  const lastId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 0
  const randomNumber = () => Math.floor(Math.random() * 100)
  const userId = randomNumber()

  const addCartHandler = async (item) => {
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

  const listOfCartItems =
    state.products.length > 0
      ? state.products.map((product) => (
          <li key={product.id}>
            <span className={styles['item-title']}>{product.title}</span> - (
            {product.quantity} x {product.price}) - {product.discountPercentage}
            % off = {product.discountedPrice}
          </li>
        ))
      : <p>Cart is empty 😕</p>
  return (
    <LayoutWrapper className={styles.wrapper}>
      <h1>Add products and create cart</h1>
      <div className={styles.inner}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder='Title'
            type='text'
            id='title'
            ref={titleRef}
            required
          />

          <input
            placeholder='Price'
            type='number'
            id='price'
            step='1'
            min='0'
            ref={priceRef}
            required
          />

          <input
            placeholder='Quantity'
            type='number'
            id='quantity'
            step='1'
            min='1'
            max='10'
            ref={quantityRef}
            required
          />

          <input
            placeholder='Discount in %'
            type='number'
            id='discount'
            step='1'
            min='0'
            max='100'
            ref={discountRef}
            required
          />

          <button type='submit'>Add Product</button>
        </form>
        <div className={styles.items}>
          <h2>Cart Items</h2>
          <ul>{listOfCartItems}</ul>
        </div>
        <div className={styles.summary}>
          <h2>Cart Summary</h2>
          <p>
            <span className={styles.label}>Total Unique Products:</span>{' '}
            {state.totalProducts}
          </p>
          <p>
            <span className={styles.label}>Total Quantity:</span>{' '}
            {state.totalQuantity}
          </p>
          <p>
            <span className={styles.label}>Total Price</span>: {state.total}
          </p>
          <p>
            <span className={styles.label}>Total Price with Discount:</span>{' '}
            {state.discountedTotal}
          </p>
          <button
            disabled={isDisabled}
            onClick={() => addCartHandler(state)}
          >
            Append Cart
          </button>
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default AddCart
