import { MateriasList } from '@/components/materias/materias-list'
import { Suspense } from 'react'

export default function MateriasListPage() {
  return (
    <Suspense>
      <MateriasList />
    </Suspense>
  )
}
