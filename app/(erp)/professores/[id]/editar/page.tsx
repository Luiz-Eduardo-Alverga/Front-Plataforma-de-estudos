import { TeacherForm } from '@/components/professores/professor-form-page'

export default async function ProfessorEditFormPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <TeacherForm mode="edit" id={id} />
}
