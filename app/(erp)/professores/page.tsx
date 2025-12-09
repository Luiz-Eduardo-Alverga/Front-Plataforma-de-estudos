import { ProfessoresList } from '@/components/professores/professores-list'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Professores',
}

export default function ProfessoresListPage() {
  return (
    <Suspense>
      <ProfessoresList />
    </Suspense>
  )
}
