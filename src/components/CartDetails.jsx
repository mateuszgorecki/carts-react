import { useParams } from 'react-router-dom'
import LayoutWrapper from './LayoutWrapper'
import { useContext } from 'react'
import CartsContext from '../context/carts-context'
import Chart from './Chart/Chart'

import styles from './CartDetails.module.scss'

const SingleCart = () => {
  const params = useParams()
  const { cartId } = params
  const ctx = useContext(CartsContext)
  const { carts } = ctx
  const cart = carts.find((cart) => cart.id === parseInt(cartId))

  const { discountedTotal, products, total, totalProducts, totalQuantity } =
    cart

  return (
    <LayoutWrapper className={styles.wrapper}>
      <h1>Cart Details</h1>

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles['cart-info']}>
            <h2>Cart no. {cartId}</h2>
            <p>
              <span>Products:</span> {totalProducts}
            </p>
            <p>
              <span>Total items:</span> {totalQuantity}
            </p>
            <p>
              <span>Price:</span> {total}
            </p>
            <p>
              <span>Discounted total:</span> {discountedTotal}
            </p>
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
        <div className={styles.right}>
          <Chart products={products} />
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default SingleCart
