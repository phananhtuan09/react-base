import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { store } from './redux/store'
import { Provider } from 'react-redux'
import './assets/scss/_main.scss'
import { publicRoutes } from './routes/publicRoutes'
import { Suspense } from 'react'

import 'react-toastify/dist/ReactToastify.css'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              path={route.path}
              element={
                <Suspense fallback={<>...</>}>
                  <route.element />
                </Suspense>
              }
              key={route.path}
            />
          ))}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
