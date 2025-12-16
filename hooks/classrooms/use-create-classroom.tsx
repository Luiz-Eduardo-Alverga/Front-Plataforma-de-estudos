import { createClassroom } from '@/services/classrooms/create-classroom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateClassroom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classrooms'] })
    },
  })
}
