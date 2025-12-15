import { createTeacher } from '@/services/teacher/create-teacher'
import { useMutation } from '@tanstack/react-query'

export function useCreateTeacher() {
  return useMutation({
    mutationFn: createTeacher,
  })
}
