import { createSubject } from '@/services/subjects/create-subject'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateSubject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSubject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
  })
}
