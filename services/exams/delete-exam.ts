import api from '@/lib/axios'

interface DeleteExamProps {
  id: string
}

export async function deleteExam({ id }: DeleteExamProps) {
  const response = await api.delete(`/exams/${id}`)

  return response.data
}
