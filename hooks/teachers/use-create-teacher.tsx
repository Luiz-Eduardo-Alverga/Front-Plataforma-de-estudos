import { createTeacher } from '@/services/teacher/create-teacher'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateTeacher() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
  })
}
