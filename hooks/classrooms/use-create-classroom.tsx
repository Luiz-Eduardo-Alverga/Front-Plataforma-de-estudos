import { createClassroom } from '@/services/classrooms/create-classroom'
import { useMutation } from '@tanstack/react-query'

export function useCreateClassroom() {
  return useMutation({
    mutationFn: createClassroom,
  })
}
