import { UpdateClassroom } from '@/interfaces/classroom'
import api from '@/lib/axios'

export async function updateClassroom({
  classroomId,
  classroomData,
}: UpdateClassroom) {
  const response = await api.put(`/classrooms/${classroomId}`, classroomData)

  return response.data
}
