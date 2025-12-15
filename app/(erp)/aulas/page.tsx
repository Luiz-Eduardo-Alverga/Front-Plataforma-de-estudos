import { ClassroomsList } from '@/components/classrooms/classrooms-list'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Aulas',
}

export default function ClassroomsPage() {
  return (
    <Suspense>
      <ClassroomsList />
    </Suspense>
  )
}
