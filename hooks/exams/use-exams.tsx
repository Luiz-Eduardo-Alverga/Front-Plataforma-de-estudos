import { getExams } from '@/services/exams/get-exams'
import { useQuery } from '@tanstack/react-query'

interface useExamsProps {
  page?: number
}

export function useExams({ page }: useExamsProps) {
  return useQuery({
    queryKey: ['exams', page],
    queryFn: () => getExams({ page }),
  })
}
