import { Classroom } from '@/interfaces/classroom'
import api from '@/lib/axios'

interface GetClassroomParams {
  classroomId: string
}

export async function getClassroom({ classroomId }: GetClassroomParams) {
  const response = await api.get<Classroom>(`/classrooms/${classroomId}`)

  return response.data
}
