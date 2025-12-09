import { GetProfessoresResponse } from '@/interfaces/taecher'
import api from '@/lib/axios'

interface GetProfessoresParams {
  page?: number
}

export async function getProfessores({ page }: GetProfessoresParams) {
  const response = await api.get<GetProfessoresResponse>('/teachers', {
    params: {
      page,
    },
  })

  return response.data
}
