import { isRouteErrorResponse, useRouteError, NavLink } from 'react-router-dom'
import Header from '../components/Header'

import styles from '../styles/Error.module.scss'

function ErrorPage() {
  const error = useRouteError()
  console.log(error)

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Header />
        <main
          id='error-content'
          className={styles.error}
        >
          <h1>Oops, {error.status}!</h1>
          <p>{error.statusText}</p>
          {error.data?.message && (
            <p>
              <i className={styles.message}>"{error.data.message}"</i>
            </p>
          )}
        </main>
      </>
    )
  } else if (error instanceof Error) {
    return (
      <div
        id='error-page'
        className={styles.error}
      >
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i className={styles.message}>"{error.message}"</i>
        </p>
        <p>Take me home.</p>
        <NavLink to='/'>Home</NavLink>
      </div>
    )
  } else
    return (
      <div
        id='error-page'
        className={styles.error}
      >
        <h1>Oops! Page not found.</h1>
        <p>Take me home.</p>
        <NavLink to='/'>Home</NavLink>
      </div>
    )
}

export default ErrorPage
