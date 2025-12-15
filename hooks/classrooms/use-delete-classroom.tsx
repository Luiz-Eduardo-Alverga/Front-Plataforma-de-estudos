import { deleteClassroom } from '@/services/classrooms/delete-classroom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function UseDeleteClassroom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classrooms'] })
      toast.success('Aula deletada com sucesso')
    },
  })
}
