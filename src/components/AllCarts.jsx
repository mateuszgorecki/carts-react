import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
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
          deleteCart={() => deleteCartHandler(cart.id)}
        />
      )
    })
  }

  const items =
    carts.length <= 0 ? (
      <div>
        <p>There's no carts. 😕</p>
        <p>
          Refresh page or add some <NavLink to='/add-cart'>here</NavLink>
        </p>
      </div>
    ) : (
      renderCarts()
    )

  return (
    <LayoutWrapper>
      <h1>All Carts</h1>
      <ul className={styles.items}>{items}</ul>
    </LayoutWrapper>
  )
}

export default AllCharts
