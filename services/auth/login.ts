import api from '@/lib/axios'

interface LoginProps {
  email: string
  password: string
}

export async function login({ email, password }: LoginProps) {
  const response = await api.post(
    '/login',
    {
      email,
      password,
    },
    {
      skipAuthRedirect: true,
    },
  )

  localStorage.setItem('token', response.data.token)

  return response.data
}
