import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { publicRoutes } from '@/routes/publicRoutes'
import React, { Fragment, Suspense, useEffect } from 'react'
import * as testApi from '@/apiServices/testApi'

const DefaultLayout = React.lazy(() =>
  import('@/Components/Layout/DefaultLayout')
)
const NotFoundPage = React.lazy(() => import('@/Pages/NotFound'))

function App() {
  useEffect(() => {
    let myInfo = {
      name: 'Tuan',
      email: 'abc@gmail.com',
      phone: '0123456789',
    }
    const fetchApi = async () => {
      const result = await testApi.addUsers(myInfo)
      console.log(result)
    }
    fetchApi()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => {
          let Layout = DefaultLayout
          if (route.layout) {
            Layout = route.layout
          } else if (route.layout === null) {
            Layout = Fragment
          }
          return (
            <Route
              path={route.path}
              element={
                <Suspense fallback={<>...</>}>
                  <Layout>
                    <route.element />
                  </Layout>
                </Suspense>
              }
              key={route.path}
            />
          )
        })}
        <Route
          path="*"
          element={
            <Suspense fallback={<>...</>}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
