import { ClassroomForm } from '@/components/classrooms/classroom-form-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Aula',
}

export default async function EditClassroomPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <ClassroomForm mode="edit" id={id} />
}
