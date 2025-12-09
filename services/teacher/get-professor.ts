import { Professor } from '@/interfaces/taecher'
import api from '@/lib/axios'

interface GetProfessorParams {
  teacherId: string
}

export async function getProfessor({ teacherId }: GetProfessorParams) {
  const response = await api.get<Professor>(`/teachers/${teacherId}`)

  return response.data
}
