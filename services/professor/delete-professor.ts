import api from '@/lib/axios'

interface deleteProfessorParams {
  id: string
}

export async function deleteProfessor({ id }: deleteProfessorParams) {
  const response = await api.delete(`teachers/${id}`)

  return response.data
}
