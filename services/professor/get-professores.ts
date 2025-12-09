import { GetProfessoresResponse } from '@/interfaces/professor'
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
