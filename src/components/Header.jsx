import styles from '../styles/Header.module.scss'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className={styles.header}>
      <ul>
        <li>
          <NavLink to='/' className={(navData) =>
            navData.isActive ? styles.active : ''
          } >Home</NavLink>
        </li>
        <li>
          <NavLink to='/all-carts' className={(navData) =>
            navData.isActive ? styles.active : ''
          } >All Carts</NavLink>
        </li>
        <li>
          <NavLink to='/add-cart'  className={(navData) =>
            navData.isActive ? styles.active : ''
          }>Add Cart</NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Header
