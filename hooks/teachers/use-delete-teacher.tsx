import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteTeacher } from '@/services/teacher/delete-professor'

export function useDeleteTeacher() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professores'] })
      toast.success('Professor deletado com sucesso')
    },
  })
}
