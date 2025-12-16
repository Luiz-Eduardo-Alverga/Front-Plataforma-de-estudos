import { UpdateExam } from '@/interfaces/exam'
import api from '@/lib/axios'

export async function updateExam({ examId, examData }: UpdateExam) {
  const response = await api.put(`/exams/${examId}`, examData)

  return response.data
}
