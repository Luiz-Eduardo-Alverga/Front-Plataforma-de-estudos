import { getClassrooms } from '@/services/classrooms/get-classrooms'
import { useQuery } from '@tanstack/react-query'

interface UseClassroomsProps {
  page?: number
}

export function useClassrooms({ page }: UseClassroomsProps) {
  return useQuery({
    queryKey: ['classrooms', page],
    queryFn: () => getClassrooms({ page }),
  })
}
