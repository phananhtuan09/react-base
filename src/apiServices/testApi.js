import { ApiClient } from '@/apiServices/apiClient'

export const getUsers = async (id) => {
  try {
    const res = await ApiClient.get(`/users/${id}/posts`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
export const addUsers = async (myInfo) => {
  try {
    const res = await ApiClient.post('/users', {}, myInfo)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
