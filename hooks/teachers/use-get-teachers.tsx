import { getProfessores } from '@/services/teacher/get-professores'
import { useQuery } from '@tanstack/react-query'

export function useTeachers(page: number = 1) {
  return useQuery({
    queryKey: ['professores', page],
    queryFn: () => getProfessores({ page }),
  })
}
