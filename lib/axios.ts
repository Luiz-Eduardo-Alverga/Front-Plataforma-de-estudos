import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

let onUnauthorized: null | (() => void) = null
export const setOnUnauthorized = (fn: null | (() => void)) => {
  onUnauthorized = fn
}

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.config?.skipAuthRedirect) {
      return Promise.reject(error)
    }

    const status = error?.response?.status

    if (status === 401 && typeof window !== 'undefined') {
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('token')

        if (onUnauthorized) onUnauthorized()
        else window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  },
)

export default api
