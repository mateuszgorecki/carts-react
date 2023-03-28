import styles from '../styles/Header.module.scss'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className={styles.header}>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/all-carts'>All Carts</NavLink>
        </li>
        <li>
          <NavLink to='/add-cart'>Add Cart</NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Header
