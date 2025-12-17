import api from '@/lib/axios'

export async function validateToken() {
  const response = await api.get('/user', { skipAuthRedirect: true })

  return response.data
}
