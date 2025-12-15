import { ClassroomResponse } from '@/interfaces/classroom'
import api from '@/lib/axios'

interface getClassroomsParams {
  page?: number
}

export async function getClassrooms({ page }: getClassroomsParams) {
  const response = await api.get<ClassroomResponse>('/classrooms', {
    params: {
      page,
    },
  })

  return response.data
}
