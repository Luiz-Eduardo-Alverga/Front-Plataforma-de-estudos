import { updateExam } from '@/services/exams/update-exam'
import { useMutation } from '@tanstack/react-query'

export function useUpdateExam() {
  return useMutation({
    mutationFn: updateExam,
  })
}
