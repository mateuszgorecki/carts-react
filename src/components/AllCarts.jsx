import { useContext, useState } from 'react'
import CartsContext from '../context/carts-context'
import LayoutWrapper from './LayoutWrapper'
import SingleItem from './SingleItem'
import Modal from './Modal'

import styles from '../styles/AllCarts.module.scss'

const AllCharts = () => {
  const [modal, setModal] = useState(false)

  const toggleModal = (arg) => {
    setModal(arg)
  }
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
  // TODO: Add modal functionality and use usePortal to render modal
  return (
    <LayoutWrapper>
      <h1>All Carts</h1>
      <ul className={styles.items}>{renderCarts()}</ul>

      {modal && (
        <Modal
          toggleModal={toggleModal}
          deleteCart={deleteCartHandler}
        />
      )}
    </LayoutWrapper>
  )
}

export default AllCharts
