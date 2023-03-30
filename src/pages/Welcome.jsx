import { NavLink } from 'react-router-dom'

import styles from '../styles/Welcome.module.scss'

const WelcomePage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Welcome page</h1>
      <p>Take a look to all charts</p>
      <p>⬇</p>
      <NavLink to='/all-carts'>All Carts</NavLink>
    </div>
  )
}

export default WelcomePage
