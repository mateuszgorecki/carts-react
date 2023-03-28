import { useContext } from 'react'
import CartsContext from '../context/carts-context'
import LayoutWrapper from './LayoutWrapper'
import SingleItem from './SingleItem'

import styles from '../styles/AllCarts.module.scss'

const AllCharts = () => {
  const ctx = useContext(CartsContext)

  const { carts } = ctx

  const deleteCartHandler = (id) => {
    ctx.deleteCart(id)
  }

  const renderCarts = () => {
    return carts.map((cart) => {
      return (
        <SingleItem
          key={cart.id}
          id={cart.id}
          total={cart.total}
          discountedTotal={cart.discountedTotal}
          totalProducts={cart.totalProducts}
          totalQuantity={cart.totalQuantity}
          deleteCart={deleteCartHandler}
        />
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
