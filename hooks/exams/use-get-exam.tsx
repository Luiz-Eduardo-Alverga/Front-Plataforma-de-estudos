import { getExam } from '@/services/exams/get-exam'
import { useQuery } from '@tanstack/react-query'

interface UseExamProps {
  id: string
  mode: 'edit' | 'create'
}

export function useExam({ id, mode }: UseExamProps) {
  return useQuery({
    queryKey: ['exam', id],
    queryFn: () => getExam({ examId: id }),
    enabled: mode === 'edit',
  })
}
