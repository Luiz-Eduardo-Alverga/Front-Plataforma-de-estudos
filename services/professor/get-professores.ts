import { GetProfessoresResponse } from '@/interfaces/Professor'
import api from '@/lib/axios'

export async function getProfessores() {
  const response = await api.get<GetProfessoresResponse>('/teachers')

  return response.data
}
