import api from '@/lib/axios'

interface RegisterUserBody {
  name: string
  email: string
  password: string
}

export async function registerUserFn({
  name,
  email,
  password,
}: RegisterUserBody) {
  const response = await api.post('/users', {
    name,
    email,
    password,
  })

  return response.data
}
