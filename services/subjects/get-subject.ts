import { Subject } from '@/interfaces/subjects'
import api from '@/lib/axios'

interface GetSubjectParams {
  subjectId: string
}

export async function getSubject({ subjectId }: GetSubjectParams) {
  const response = await api.get<Subject>(`/subjects/${subjectId}`)

  return response.data
}
