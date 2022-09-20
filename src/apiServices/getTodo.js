import * as httpRequest from '@/utils/httpRequest'

export const getTodo = async (id) => {
  try {
    const res = await httpRequest.get(`/${id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}
