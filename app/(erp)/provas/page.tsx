import { ExamsList } from '@/components/exams/exams-list'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Provas',
}

export default function ProvasPage() {
  return (
    <Suspense>
      <ExamsList />
    </Suspense>
  )
}
