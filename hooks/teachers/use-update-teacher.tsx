import { updateTeacher } from '@/services/teacher/update-teacher'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateTeacher() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    }
  })
}
