import { ExamResponse } from '@/interfaces/exam'
import api from '@/lib/axios'

interface getExamsParams {
  page?: number
}

export async function getExams({ page }: getExamsParams) {
  const response = await api.get<ExamResponse>('/exams', {
    params: {
      page,
    },
  })

  return response.data
}
