import { SubjectResponse } from '@/interfaces/subject'
import api from '@/lib/axios'

interface GetSubjectParams {
  page?: number
}

export async function getSubjects({ page }: GetSubjectParams) {
  const response = await api.get<SubjectResponse>('/subjects', {
    params: {
      page,
    },
  })

  return response.data
}
