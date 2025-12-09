import api from '@/lib/axios'

interface DeleteSubjectParams {
  id: string
}

export async function deleteSubject({ id }: DeleteSubjectParams) {
  const response = await api.delete(`/subjects/${id}`)

  return response.data
}
