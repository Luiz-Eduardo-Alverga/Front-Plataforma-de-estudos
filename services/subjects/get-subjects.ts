import { SubjectResponse } from '@/interfaces/subjects'
import api from '@/lib/axios'

export async function getSubjects() {
  const response = await api.get<SubjectResponse>('/subjects')

  return response.data
}
