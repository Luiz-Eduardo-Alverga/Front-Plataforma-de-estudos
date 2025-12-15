import { updateTeacher } from '@/services/teacher/update-teacher'
import { useMutation } from '@tanstack/react-query'

export function useUpdateTeacher() {
  return useMutation({
    mutationFn: updateTeacher,
  })
}
