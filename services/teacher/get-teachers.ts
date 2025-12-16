import { GetTeachersResponse } from '@/interfaces/teacher'
import api from '@/lib/axios'

interface GetTeachersParams {
  page?: number
}

export async function getTeachers({ page }: GetTeachersParams) {
  const response = await api.get<GetTeachersResponse>('/teachers', {
    params: {
      page,
    },
  })

  return response.data
}
