import axios from 'axios'
import { stringify } from 'qs'
// const domainUrl = process.env.REACT_APP_BASE_URL
const domainUrl = 'https://reqres.in/api'
const accessToken = ''
export const ApiClient = {
  getHeaders(contentType = 'application/x-www-form-urlencoded') {
    return {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      authorization: `Bearer ${accessToken}`,
    }
  },
  //convert object to query string
  getStringQuery(query = {}, options = {}) {
    /* *
        query = object(valid or empty)
             + valid => string query
             + empty => return false
        query = string(valid or empty)
             + valid => not change
             + empty => return false       
    */
    let resultQuery = query
    if (
      typeof resultQuery === 'object' &&
      Object.keys(resultQuery).length === 0
    ) {
      return (resultQuery = '')
    }
    if (resultQuery && typeof resultQuery !== 'string') {
      resultQuery = stringify(resultQuery, options)
    }
    return resultQuery
  },
  handleFormKey(namespace, property) {
    if (!namespace) {
      return property
    }

    if (!isNaN(Number(property))) {
      return `${namespace}[${property}]`
    }
    return `${namespace}.${property}`
  },
  handleObjProperty(fd, formKey, objElement) {
    if (objElement instanceof Date) {
      fd.append(formKey, objElement.toISOString())

      return
    }
    if (
      typeof objElement === 'object' &&
      !(objElement instanceof File) &&
      !(objElement instanceof Blob)
    ) {
      this.convertToPostData(objElement, fd, formKey)

      return
    }
    fd.append(formKey, objElement)
  },
  catchErrorRequest(error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      let errorResponse = {
        message: error.message,
        status: error.response.status,
        headers: error.response.headers,
      }

      return errorResponse
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      return error.request
    } else {
      // Something happened in setting up the request and triggered an Error
      return { Error: error.message }
    }
  },
  convertToPostData(obj, form, namespace) {
    const fd = form || new URLSearchParams()

    let formKey
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        formKey = this.handleFormKey(namespace, property)
        this.handleObjProperty(fd, formKey, obj[property])
      }
    }
    return fd
  },
  // get
  async get(url = '', query = {}, params = {}) {
    let stringQuery = this.getStringQuery(query)
    let requestUrl = !stringQuery ? url : `${url}?${stringQuery}`
    const response = await axios
      .get(domainUrl + requestUrl, {
        params,
        headers: this.getHeaders(),
      })
      .catch((error) => this.catchErrorRequest(error))
    return response
  },
  //post
  async post(url = '', query = {}, params = {}, appendUrl = '') {
    let stringQuery = this.getStringQuery(query)
    let requestUrl = !stringQuery
      ? url
      : ` ${url}?${stringQuery}${appendUrl || ''}`
    const param = this.convertToPostData(params, undefined, undefined)

    const config = {
      headers: this.getHeaders(),
    }

    const response = await axios
      .post(domainUrl + requestUrl, param, config)
      .catch((error) => this.catchErrorRequest(error))
    return response
  },
  async postJsonData(url = '', query = {}, params = {}) {
    let stringQuery = this.getStringQuery(query)
    const requestUrl = !stringQuery ? url : `${url}?${stringQuery}`

    const config = {
      headers: this.getHeaders('application/json'),
    }

    const response = await axios
      .post(domainUrl + requestUrl, params, config)
      .catch((error) => this.catchErrorRequest(error))
    return response
  },
  async postMultipleData(url = '', query = {}, params = {}) {
    let stringQuery = this.getStringQuery(query)
    const requestUrl = !stringQuery ? url : `${url}?${stringQuery}`

    const config = {
      headers: this.getHeaders('multipart/form-data'),
    }
    const form = new FormData()
    const param = this.convertToPostData(params, form, undefined)
    const response = await axios
      .post(domainUrl + requestUrl, param, config)
      .catch((error) => this.catchErrorRequest(error))
    return response
  },
  async postFile(url = '', query = {}, fileKey = '', file) {
    let stringQuery = this.getStringQuery(query)
    const requestUrl = !stringQuery ? url : `${url}?${stringQuery}`
    const config = {
      headers: this.getHeaders(),
    }

    const formData = new FormData()
    formData.append(fileKey, file)
    const response = await axios
      .post(domainUrl + requestUrl, formData, config)
      .catch((error) => this.catchErrorRequest(error))
    return response
  },
  //put
  async putJsonData(url = '', query = {}, params = {}) {
    let stringQuery = this.getStringQuery(query)
    const requestUrl = !stringQuery ? url : `${url}?${stringQuery}`

    const config = {
      headers: this.getHeaders('application/json'),
    }

    const response = await axios
      .put(domainUrl + requestUrl, params, config)
      .catch((error) => this.catchErrorRequest(error))
    return response
  },
  async putJsonDataArr(url = '', query = {}, params = {}) {
    let stringQuery = this.getStringQuery(query)
    const requestUrl = !stringQuery ? url : `${url}?${stringQuery}`

    const config = {
      headers: this.getHeaders('application/json'),
    }

    const response = await axios
      .put(domainUrl + requestUrl, params, config)
      .catch((error) => this.catchErrorRequest(error))
    return response
  },
  async put(url = '', query = {}, params = {}) {
    let stringQuery = this.getStringQuery(query)
    const requestUrl = !stringQuery ? url : `${url}?${stringQuery}`
    const config = {
      headers: this.getHeaders(),
    }
    const response = await axios
      .put(domainUrl + requestUrl, params, config)
      .catch((error) => this.catchErrorRequest(error))

    return response
  },
  //delete
  async delete(url = '', params = {}) {
    let stringQuery = this.getStringQuery(params)
    const requestUrl = !stringQuery ? url : `${url}?${stringQuery}`

    const config = {
      headers: this.getHeaders(),
    }

    const response = await axios
      .delete(domainUrl + requestUrl, config)
      .catch((error) => this.catchErrorRequest(error))
    return response
  },

  async deleteBody(url = '', params = {}) {
    const requestUrl = `${url}`
    const config = {
      headers: this.getHeaders('application/json'),
      data: params,
    }
    const response = axios
      .delete(domainUrl + requestUrl, config)
      .catch((error) => this.catchErrorRequest(error))
    return response
  },
}
