import { ClassroomsList } from '@/components/classrooms/classrooms-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aulas',
}

export default function ClassroomsPage() {
  return <ClassroomsList />
}
