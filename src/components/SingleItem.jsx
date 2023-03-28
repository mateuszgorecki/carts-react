import { NavLink } from 'react-router-dom'

import styles from '../styles/SingleItem.module.scss'

const SingleItem = (props) => {
  const {
    id,
    title,
    total,
    discountedTotal,
    totalProducts,
    totalQuantity,
    deleteCart,
  } = props
  return (
    <li
      className={styles.item}
      key={id}
    >
      <NavLink to={`/all-carts/${id}`}>
        <p className={title}>Cart no. {id}</p>
        <p>Price: {total}</p>
        <p>Price after discount: {discountedTotal}</p>
        <p>Different products: {totalProducts}</p>
        <p>Total items: {totalQuantity}</p>
      </NavLink>
      <button onClick={() => deleteCart(id)}>
        <span>&#x02010;</span>
      </button>
    </li>
  )
}

export default SingleItem
