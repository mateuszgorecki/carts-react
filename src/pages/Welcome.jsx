import { NavLink } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <>
      <h1>Welcome page</h1>
      <NavLink to='/all-carts'>All Carts</NavLink>
    </>
  )
}

export default WelcomePage
