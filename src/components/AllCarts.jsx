import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import LayoutWrapper from './LayoutWrapper'

import styles from '../styles/AllCarts.module.scss'


const AllCharts = () => {
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

  const renderCarts = () => {
    return carts.map((cart) => {
      return (
        <li
          className={styles.item}
          key={cart.id}
        >
          <NavLink to={`/all-carts/${cart.id}`}>
            <p className={styles.title}>Cart no. {cart.id}</p>
            <p>Price: {cart.total}</p>
            <p>Price after discount: {cart.discountedTotal}</p>
            <p>Different products: {cart.totalProducts}</p>
            <p>Total items: {cart.totalQuantity}</p>
          </NavLink>
          <button>
            <span>&#x02010;</span>
          </button>
        </li>
      )
    })
  }
  return (
    <LayoutWrapper>
      <h1>All Carts</h1>
      <ul className={styles.items}>{renderCarts()}</ul>
    </LayoutWrapper>
  )
}

export default AllCharts
