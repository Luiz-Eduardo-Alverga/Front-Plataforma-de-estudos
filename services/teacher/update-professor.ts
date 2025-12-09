import { UpdateProfessorProps } from '@/interfaces/taecher'
import api from '@/lib/axios'

export async function updateProfessor({
  teacherId,
  teacherData,
}: UpdateProfessorProps) {
  const response = await api.put(`/teachers/${teacherId}`, teacherData)

  return response.data
}
