import { TeachersList } from '@/components/teachers/teachers-list'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Professores',
}

export default function TeachersListPage() {
  return (
    <Suspense>
      <TeachersList />
    </Suspense>
  )
}
