import { SubjectForm } from '@/components/subjects/subject-form-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Matéria',
}

export default async function SubjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <SubjectForm mode="edit" id={id} />
}
