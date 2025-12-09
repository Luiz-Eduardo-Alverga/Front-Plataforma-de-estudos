import { ProfessoresList } from '@/components/professores/professores-list'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professores',
}

export default function ProfessoresListPage() {
  return <ProfessoresList />
}
