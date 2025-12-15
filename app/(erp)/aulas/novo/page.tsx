import { ClassroomForm } from '@/components/classrooms/classroom-form-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nova Aula',
}

export default function NewClassroomPage() {
  return <ClassroomForm mode="create" id="" />
}
