import api from '@/lib/axios'

interface deleteProfessorParams {
  id: string
}

export async function deleteTeacher({ id }: deleteProfessorParams) {
  const response = await api.delete(`teachers/${id}`)

  return response.data
}
