import Input from '../../Components/Global/Input'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './Login.scss'
function Login() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="firstName">
            First Name
          </label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={`${
              formik.touched.firstName && formik.errors.firstName
                ? `${formik.errors.firstName}`
                : ''
            }`}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lastName">
            Last Name
          </label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={`${
              formik.touched.lastName && formik.errors.lastName
                ? `${formik.errors.lastName}`
                : ''
            }`}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={`${
              formik.touched.email && formik.errors.email
                ? `${formik.errors.email}`
                : ''
            }`}
          />
        </div>
        <button type="submit" className="submit_btn">
          Submit
        </button>
      </form>
    </>
  )
}

export default Login
