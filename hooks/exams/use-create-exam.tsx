import { createExam } from '@/services/exams/create-exam'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateExam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] })
    },
  })
}
