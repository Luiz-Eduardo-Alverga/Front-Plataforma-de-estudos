import { UpdateTeacher } from '@/interfaces/taecher'
import api from '@/lib/axios'

export async function updateTeacher({ teacherId, teacherData }: UpdateTeacher) {
  const response = await api.put(`/teachers/${teacherId}`, teacherData)

  return response.data
}
