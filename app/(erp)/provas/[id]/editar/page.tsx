import { ExamForm } from '@/components/exams/exam-form-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Prova',
}

export default async function EditExamPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <ExamForm mode="edit" id={id} />
}
