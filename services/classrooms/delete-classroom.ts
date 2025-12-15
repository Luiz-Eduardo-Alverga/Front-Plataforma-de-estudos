import api from '@/lib/axios'

interface DeleteClassroomProps {
  id: string
}

export async function deleteClassroom({ id }: DeleteClassroomProps) {
  const response = await api.delete(`/classrooms/${id}`)

  return response.data
}
