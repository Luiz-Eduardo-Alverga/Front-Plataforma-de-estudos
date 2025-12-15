import { SubjectForm } from '@/components/subjects/subject-form-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nova Matéria',
}

export default function NewSubjectPage() {
  return <SubjectForm mode="create" id="" />
}
