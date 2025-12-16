import { deleteExam } from '@/services/exams/delete-exam'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useDeleteExam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] })
      toast.success('Prova deletada com sucesso')
    },
  })
}
