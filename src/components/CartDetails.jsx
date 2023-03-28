import { useParams } from 'react-router-dom'
import LayoutWrapper from './LayoutWrapper'
import { useContext } from 'react'
import CartsContext from '../context/carts-context'

import styles from '../styles/CartDetails.module.scss'

const SingleCart = () => {
  const params = useParams()
  const { cartId } = params
  const ctx = useContext(CartsContext)
  const { carts } = ctx
  const cart = carts.find((cart) => cart.id === parseInt(cartId))

  const {
    discountedTotal,
    products,
    total,
    totalProducts,
    totalQuantity,
  } = cart

  return (
    <LayoutWrapper className={styles.wrapper}>
      <h1>cart details</h1>

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles['cart-info']}>
            <h1>Cart no. {cartId}</h1>
            <div>
              <p>Products: {totalProducts}</p>
              <p>Total items: {totalQuantity}</p>
            </div>
            <div>
              <p>Price: {total}</p>
              <p>Discounted total: {discountedTotal}</p>
            </div>
          </div>

          <ul className={styles.items}>
            {products.map((product) => {
              return (
                <li key={product.id}>
                  <div>
                    <p>{product.title}</p>
                    <p>
                      {product.price} x {product.quantity}: {product.total}
                    </p>
                  </div>
                  <div>
                    <p>Discount: {product.discountPercentage}%</p>
                    <p>Summary: {product.discountedPrice}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.right}></div>
      </div>
    </LayoutWrapper>
  )
}

export default SingleCart
