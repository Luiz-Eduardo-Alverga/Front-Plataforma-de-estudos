import { UpdateSubject } from '@/interfaces/subjects'
import api from '@/lib/axios'

export async function updateSubject({ subjectId, subjectData }: UpdateSubject) {
  const response = await api.put(`/subjects/${subjectId}`, subjectData)

  return response.data
}
