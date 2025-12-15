import { updateSubject } from '@/services/subjects/update-subject'
import { useMutation } from '@tanstack/react-query'

export function useUpdateSubject() {
  return useMutation({
    mutationFn: updateSubject,
  })
}
