import axios from 'axios'
import { stringify } from 'qs'
// const domainUrl = process.env.REACT_APP_BASE_URL
const domainUrl = 'https://gorest.co.in/public/v2'
export const ApiClient = {
  getHeaders(contentType = 'application/x-www-form-urlencoded') {
    return {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
    }
  },
  getStringQuery(query = {}, options = {}) {
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
    console.log('case3', objElement)
  },
  convertToPostData(obj, form, namespace) {
    const fd = form || new URLSearchParams()
    console.log('fd1', fd)
    let formKey
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        formKey = this.handleFormKey(namespace, property)
        this.handleObjProperty(fd, formKey, obj[property])
        console.log('fd2', fd)
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
      .catch((error) => console.log(error))
    return response
  },
  //post
  async post(url = '', query = {}, params = {}, appendUrl = '') {
    let stringQuery = this.getStringQuery(query)
    let requestUrl = !stringQuery
      ? url
      : ` ${url}?${stringQuery}${appendUrl || ''}`
    const param = this.convertToPostData(params, undefined, undefined)
    console.log('param', param)
    let defaultHeaders = ApiClient.getHeaders()
    const headers = {
      Authorization: `Bearer ${'acc9682a3564246e3ba75d7938a3523e9ad9822d5718128a2d44303ac551f691'}`,
    }
    const config = {
      headers: Object.assign(defaultHeaders, headers),
    }

    const response = await axios
      .post(domainUrl + requestUrl, param, config)
      .catch((error) => console.log(error))
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
      .catch((error) => console.log(error))
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
      .catch((error) => console.log(error))
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
      .catch((error) => console.log(error))
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
      .catch((error) => console.log(error))
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
      .catch((error) => console.log(error))
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
      .catch((error) => console.log(error))
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
      .catch((error) => console.log(error))
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
      .catch((error) => console.log(error))
    return response
  },
}
