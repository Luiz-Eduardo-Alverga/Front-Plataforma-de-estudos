import { updateClassroom } from '@/services/classrooms/update-classroom'
import { useMutation } from '@tanstack/react-query'

export function useUpdateClassroom() {
  return useMutation({
    mutationFn: updateClassroom,
  })
}
