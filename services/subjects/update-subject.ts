import { UpdateSubject } from '@/interfaces/subject'
import api from '@/lib/axios'

export async function updateSubject({ subjectId, subjectData }: UpdateSubject) {
  const response = await api.put(`/subjects/${subjectId}`, subjectData)

  return response.data
}
