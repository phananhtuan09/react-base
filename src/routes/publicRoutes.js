import React from 'react'
const Login = React.lazy(() => import('../Pages/Login'))
const App = React.lazy(() => import('../App'))

export const publicRoutes = [
  { title: 'App', path: '/', element: App },
  {
    title: 'Login',
    path: '/login',
    element: Login,
  },
]
