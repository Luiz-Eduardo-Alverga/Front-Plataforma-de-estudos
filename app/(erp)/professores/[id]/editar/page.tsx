import { ProfessorForm } from '@/components/professores/professor-form-page'

export default async function ProfessorEditFormPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  return <ProfessorForm mode="edit" />
}
