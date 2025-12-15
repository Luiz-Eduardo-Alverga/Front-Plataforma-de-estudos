import api from '@/lib/axios'

interface deleteTeacherParams {
  id: string
}

export async function deleteTeacher({ id }: deleteTeacherParams) {
  const response = await api.delete(`teachers/${id}`)

  return response.data
}
