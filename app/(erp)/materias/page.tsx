import { SubjectsList } from '@/components/subjects/subjects-list'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Materias',
}

export default function SubjectsListPage() {
  return (
    <Suspense>
      <SubjectsList />
    </Suspense>
  )
}
