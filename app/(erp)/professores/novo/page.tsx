import { TeacherForm } from '@/components/teachers/teacher-form-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Novo Professor',
}

export default function NewTeacherPage() {
  return <TeacherForm mode="create" id="" />
}
