import { Teacher } from '@/interfaces/teacher'
import api from '@/lib/axios'

interface GetTeacherParams {
  teacherId: string
}

export async function getTeacher({ teacherId }: GetTeacherParams) {
  const response = await api.get<Teacher>(`/teachers/${teacherId}`)

  return response.data
}
