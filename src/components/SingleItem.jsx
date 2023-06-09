import { NavLink } from 'react-router-dom'

import styles from './SingleItem.module.scss'

const SingleItem = (props) => {
  const {
    id,
    total,
    discountedTotal,
    totalProducts,
    totalQuantity,
    deleteCart,
  } = props
  return (
    <li className={styles.item}>
      <NavLink to={`/all-carts/${id}`}>
        <p>Cart no. {id}</p>
        <p>Price: {total}</p>
        <p>After discount: {discountedTotal}</p>
        <p>Different products: {totalProducts}</p>
        <p>Total items: {totalQuantity}</p>
      </NavLink>
      <button onClick={() => deleteCart(id)}></button>
    </li>
  )
}

export default SingleItem
