import { ApiClient } from '@/apiServices/apiClient'

export const getTodo = async () => {
  try {
    const res = await ApiClient.get('', {
      tags: 'cute',
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
