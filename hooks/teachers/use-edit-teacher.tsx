import { updateProfessor } from '@/services/teacher/update-professor'
import { useMutation } from '@tanstack/react-query'

export function useEditTeacher() {
  return useMutation({
    mutationFn: updateProfessor,
  })
}
