import { Exam } from '@/interfaces/exam'
import api from '@/lib/axios'

interface GetExamParams {
  examId: string
}

export async function getExam({ examId }: GetExamParams) {
  const response = await api.get<Exam>(`/exams/${examId}`)

  return response.data
}
