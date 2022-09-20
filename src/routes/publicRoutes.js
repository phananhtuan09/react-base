import React from 'react'
const Login = React.lazy(() => import('@/Pages/Login'))
const Home = React.lazy(() => import('@/Pages/Home'))
const Profile = React.lazy(() => import('@/Pages/Profile'))

export const publicRoutes = [
  { title: 'Home', path: '/', element: Home },
  {
    title: 'Login',
    path: '/login',
    element: Login,
    layout: null,
  },
  {
    title: 'Profile',
    path: '/profile',
    element: Profile,
  },
]
