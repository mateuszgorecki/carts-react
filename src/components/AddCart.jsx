import React, { useReducer, useContext, useState } from 'react'
import CartsContext from '../context/carts-context'
import LayoutWrapper from './LayoutWrapper'

import styles from './AddCart.module.scss'

const MAX_TITLE_LENGTH = 40
const MAX_PRICE_LENGTH = 6

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
  if (action.type === 'RESET') {
    return initialState
  } else if (action.type === 'ADD_PRODUCT') {
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
  const { addCart, carts, isCartAdded, toggleIsAdded } = ctx

  const [titleValue, setTitle] = useState('')
  const [priceValue, setPrice] = useState('')
  const [quantityValue, setQuantity] = useState('')
  const [discountValue, setDiscount] = useState('')

  const isDisabled = !state.products.length

  const handleTitleChange = (event) => {
    const value = event.target.value
    setTitle(value.length <= MAX_TITLE_LENGTH ? value : titleValue)
  }

  const handlePriceChange = (event) => {
    const value = event.target.value
    setPrice(value.length <= MAX_PRICE_LENGTH ? value : priceValue)
  }

  const handleQuantityChange = (event) => {
    const value = event.target.value
    setQuantity(value)
  }

  const handleDiscountChange = (event) => {
    const value = event.target.value
    setDiscount(value)
  }

  const lastId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 0
  const randomNumber = () => Math.floor(Math.random() * 100)
  const userId = randomNumber()

  const addCartHandler = (item) => {
    addCart(item)

    if (isCartAdded) {
      dispatch({
        type: 'RESET',
      })
      alert('Cart append successfully')
      toggleIsAdded(false)
    }
  }

  const reset = () => {
    setTitle('')
    setPrice('')
    setQuantity('')
    setDiscount('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const title = titleValue
    const price = parseInt(priceValue)
    const quantity = parseInt(quantityValue)
    const discount = parseInt(discountValue)
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

    reset()
  }

  const listOfCartItems =
    state.products.length > 0 ? (
      state.products.map(
        ({
          id,
          title,
          quantity,
          price,
          discountPercentage,
          discountedPrice,
        }) => (
          <li key={id}>
            <span className={styles['item-title']}>{title}</span> - ({quantity}{' '}
            x {price}) - {discountPercentage}% off = {discountedPrice}
          </li>
        )
      )
    ) : (
      <p>Cart is empty 😕</p>
    )
  return (
    <LayoutWrapper className={styles.wrapper}>
      <h1>Add products and create cart</h1>
      <div className={styles.inner}>
        <form onSubmit={handleSubmit}>
          <h2>Add product</h2>
          <input
            placeholder='Title'
            type='text'
            id='title'
            value={titleValue}
            onChange={handleTitleChange}
            required
            maxLength={MAX_TITLE_LENGTH}
          />
          {titleValue.length >= MAX_TITLE_LENGTH && (
            <span style={{ color: 'red' }}>
              Maksymalna długość tytułu to {MAX_TITLE_LENGTH} znaków
            </span>
          )}

          <input
            placeholder='Price'
            type='number'
            id='price'
            value={priceValue}
            onChange={handlePriceChange}
            step='1'
            min='0'
            required
            maxLength={MAX_PRICE_LENGTH}
          />

          <input
            placeholder='Quantity'
            type='number'
            id='quantity'
            value={quantityValue}
            onChange={handleQuantityChange}
            step='1'
            min='1'
            max='10'
            required
          />
          {(quantityValue < 0 || quantityValue > 10) &&
          quantityValue.length > 0 ? (
            <span style={{ color: 'red' }}>
              Ilość musi być z przedziału 0 - 10
            </span>
          ) : null}

          <input
            placeholder='Discount in %'
            type='number'
            id='discount'
            value={discountValue}
            onChange={handleDiscountChange}
            step='1'
            min='0'
            max='100'
            required
          />
          {(discountValue < 0 || discountValue > 100) &&
          discountValue.length > 0 ? (
            <span style={{ color: 'red' }}>
              Rabat musi być z przedziału 0 - 100
            </span>
          ) : null}
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
