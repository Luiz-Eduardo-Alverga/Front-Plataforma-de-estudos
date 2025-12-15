import { TeacherForm } from '@/components/teachers/teacher-form-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Professor',
}

export default async function TeacherEditFormPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <TeacherForm mode="edit" id={id} />
}
