import { createProfessor } from '@/services/teacher/create-professor'
import { useMutation } from '@tanstack/react-query'

export function useCreateTeacher() {
  return useMutation({
    mutationFn: createProfessor,
  })
}
