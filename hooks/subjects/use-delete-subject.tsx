import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSubject } from '@/services/subjects/delete-subject'
import toast from 'react-hot-toast'

export function useDeleteSubject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
      toast.success('Matéria deletada com sucesso')
    },
  })
}
