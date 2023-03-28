import { isRouteErrorResponse, useRouteError, NavLink } from 'react-router-dom'

import Header from '../components/Header'

function ErrorPage() {
  const error = useRouteError()
  console.log(error)

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      console.log('Page not found', error)
    }

    return (
      <>
        <Header />
        <main id='error-content'>
          <h1>Oops, {error.status}!</h1>
          <p>{error.statusText}</p>
          {error.data?.message && (
            <p>
              <i>{error.data.message}</i>
            </p>
          )}
        </main>
      </>
    )
  } else if (error instanceof Error) {
    return (
      <div id='error-page'>
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    )
  } else
    return (
      <div id='error-page'>
        <h1>Oops! Page not found.</h1>
        <p>Take me home.</p>
        <NavLink to='/'>Home</NavLink>
      </div>
    )
}

export default ErrorPage
