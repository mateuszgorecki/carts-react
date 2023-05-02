import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import ErrorPage from './pages/Error'
import AllCharts from './components/AllCarts'
import AddCart from './components/AddCart'
import CartDetails from './components/CartDetails'
import WelcomePage from './pages/Welcome'
import CartsProvider from './context/CartsProvider'

import styles from './App.module.scss'
import './styles/_global.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: '/all-carts',
        element: <AllCharts />,
      },

      {
        path: '/add-cart',
        element: <AddCart />,
      },
      {
        path: '/all-carts/:cartId',
        element: <CartDetails />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
])

function App() {
  return (
    <CartsProvider>
      <div className={styles.app}>
        <RouterProvider router={router} />
      </div>
    </CartsProvider>
  )
}

export default App


//TODO: turn to ES6
//TODO: read about deps and devDeps to organize them
//TODO: add unit tests (jest)
//TODO: static code analysis (lefovers, console.logs and so on)
//TODO: turn to TS