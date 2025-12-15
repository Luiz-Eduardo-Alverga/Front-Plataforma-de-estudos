import { getTeachers } from '@/services/teacher/get-teachers'
import { useQuery } from '@tanstack/react-query'

interface useTeachersProps {
  page?: number
}

export function useTeachers({ page }: useTeachersProps) {
  return useQuery({
    queryKey: ['teachers', page],
    queryFn: () => getTeachers({ page }),
  })
}
