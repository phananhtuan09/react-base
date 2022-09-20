import axios from 'axios'
import { stringify } from 'qs'
import { saveAs } from 'file-saver'
import { routePath } from '@/generated/RoutePath'
import router from '@/router/index'

export const domainUrl = process.env.VUE_APP_BASE_URL

export default class ApiClient {
  /**
   * GET
   *
   * @param url
   * @param params
   */

  static async get(url = '', params = {}, query = {}) {
    let requestUrl = query ? `${url}?${stringify(query)}` : url
    if (typeof query === 'string') {
      requestUrl = `${url}?${query}`
    }
    const response = await axios
      .get(domainUrl + requestUrl, {
        params,
        headers: this.getHeaders(),
        data: {},
      })
      .catch((err) => this.checkToken(err.response))
    return response
  }

  /**
   * POST
   *
   * @param url
   * @param params
   */

  static async post(url = '', query = {}, params = {}, appendUrl = '') {
    const requestUrl = `${url}?${stringify(query)}${appendUrl || ''}`

    const config = {
      headers: this.getHeaders(),
      // validateStatus,
    }

    const param = this.convertToPostData(params, undefined, undefined)
    const response = await axios
      .post(domainUrl + requestUrl, param, config)
      .catch((err) => this.checkToken(err.response))
    return response
  }

  static async postJsonData(url = '', query = {}, params = {}) {
    const requestUrl = `${url}?${stringify(query)}`

    const config = {
      headers: this.getHeaders('application/json'),
      // validateStatus,
    }

    const response = await axios
      .post(domainUrl + requestUrl, params, config)
      .catch((err) => this.checkToken(err.response))
    return response
  }

  static async postMutipartData(url = '', query = {}, params = {}) {
    const requestUrl = `${url}?${stringify(query)}`

    const config = {
      headers: this.getHeaders('multipart/form-data'),
      // validateStatus,
    }
    const form = new FormData()
    const param = this.convertToPostData(params, form, undefined)
    const response = await axios
      .post(domainUrl + requestUrl, param, config)
      .catch((err) => this.checkToken(err.response))
    return response
  }

  static async postFile(url = '', query = {}, fileKey = '', file: any) {
    const requestUrl = `${url}?${stringify(query)}`
    const config = {
      headers: this.getHeaders(),
      // validateStatus,
    }

    const formData = new FormData()
    formData.append(fileKey, file)
    const response = await axios
      .post(domainUrl + requestUrl, formData, config)
      .catch((err) => this.checkToken(err.response))
    return response
  }

  /**
   * CSVファイルダウンロード
   */
  static async downloadCsv(url: string, query: any, downloadFileName: string) {
    const response = await this.get(url, query, undefined)
    const bom = new Uint8Array([0xef, 0xbb, 0xbf])
    const blob = new Blob([bom, response && response.data], {
      type: 'text/csv',
    })
    saveAs(blob, downloadFileName)
  }

  static async downloadCsvPost(
    url: string,
    query = {},
    params = {},
    downloadFileName: string
  ) {
    const requestUrl = `${url}?${stringify(query)}`

    const config = {
      headers: this.getHeaders('application/json'),
      // validateStatus,
    }

    const response = await axios
      .post(domainUrl + requestUrl, params, config)
      .catch((err) => this.checkToken(err.response))
    const bom = new Uint8Array([0xef, 0xbb, 0xbf])
    const blob = new Blob([bom, response && response.data], {
      type: 'text/csv',
    })
    saveAs(blob, downloadFileName)
  }

  /**
   * PUT
   *
   * @param url
   * @param params
   */

  static async putJsonData(url = '', query = {}, params = {}) {
    const requestUrl = `${url}?${stringify(query)}`

    const config = {
      headers: this.getHeaders('application/json'),
      // validateStatus,
    }

    const response = await axios
      .put(domainUrl + requestUrl, params, config)
      .catch((err) => this.checkToken(err.response))
    return response
  }

  static async putJsonDataArr(url = '', query = {}, params = {}) {
    const requestUrl = `${url}?${stringify(query, { arrayFormat: 'repeat' })}`

    const config = {
      headers: this.getHeaders('application/json'),
      // validateStatus,
    }

    const response = await axios
      .put(domainUrl + requestUrl, params, config)
      .catch((err) => this.checkToken(err.response))
    return response
  }

  static async put(url = '', query = {}, params = {}) {
    const requestUrl = `${url}?${stringify(query)}`
    const config = {
      headers: this.getHeaders(),
      // validateStatus,
    }

    const response = await axios
      .put(domainUrl + requestUrl, params, config)
      .catch((err) => this.checkToken(err.response))
    return response
  }

  /**
   * DELETE
   *
   * @param url
   * @param params
   */
  static async delete(url = '', params = {}) {
    const requestUrl = `${url}?${
      typeof params === 'string' ? params : stringify(params)
    }`

    const config = {
      headers: this.getHeaders(),
      // validateStatus,
    }

    const response = await axios
      .delete(domainUrl + requestUrl, config)
      .catch((err) => this.checkToken(err.response))
    return response
  }

  static async deleteBody(url = '', params = {}) {
    const requestUrl = `${url}`
    const config = {
      headers: this.getHeaders('application/json'),
      // validateStatus,
      data: params,
    }
    const response = axios
      .delete(domainUrl + requestUrl, config)
      .catch((err) => this.checkToken(err.response))
    return response
  }

  /**
   * headers
   */
  static getHeaders(contentType = 'application/x-www-form-urlencoded') {
    return {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      authorization: this.getToken(),
    }
  }

  /**
   * accessToken
   */
  static getToken() {
    const accessToken = JSON.parse(localStorage.getItem('user') || '{}')
    return `Bearer ${accessToken.token}`
  }

  private static convertToPostData(obj: any, form: any, namespace: any) {
    const fd = form || new URLSearchParams()
    let formKey

    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          if (!isNaN(Number(property))) {
            formKey = `${namespace}[${property}]`
          } else {
            formKey = `${namespace}.${property}`
          }
        } else {
          formKey = property
        }

        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString())
        } else if (
          typeof obj[property] === 'object' &&
          !(obj[property] instanceof File) &&
          !(obj[property] instanceof Blob)
        ) {
          this.convertToPostData(obj[property], fd, formKey)
        } else {
          fd.append(formKey, obj[property])
        }
      }
    }
    return fd
  }

  private static checkToken(response: any) {
    if (response.status === 401) {
      localStorage.clear()
      router.push(routePath.Login)
    }
  }
}
