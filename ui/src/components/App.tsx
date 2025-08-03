import type { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar, Center, Page, Footer } from 'decentraland-ui'

export const App: FC = () => {
  const location = useLocation()

  return (
    <>
      <Navbar activePage={location.key} />
      <Page>
        <Center>
          <Outlet />
        </Center>
      </Page>
      <Footer />
    </>
  )
}
