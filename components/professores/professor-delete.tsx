import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '../ui/alert-dialog'
import { deleteProfessor } from '@/services/professor/delete-professor'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

interface ProfessorDeleteDialogProps {
  professorId: string
  professorName: string
}

export function ProfessorDeleteDialog({professorId, professorName}: ProfessorDeleteDialogProps) {
  const queryClient = useQueryClient()

 const {mutateAsync: deleteProfessorFn, isPending} = useMutation({
  mutationFn: () => deleteProfessor({id: professorId}),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['professores'] })
  },
 })

  return (
  
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir o professor(a) {professorName}?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso irá excluir permanentemente o professor(a) e remover todos os dados associados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={async () => {
              await deleteProfessorFn()
            }}
            className='bg-destructive hover:bg-destructive/90'>
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                </>
              ) : (
                'Excluir'
              )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
  )
}
