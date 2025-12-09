import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '../ui/alert-dialog'

import { Button } from '../ui/button'
import { AlertTriangle, Loader2 } from 'lucide-react'

interface DeleteEntityProps {
  entityId: string
  entityName: string
  deleteFn: (id: string) => Promise<void> | void
  isLoading: boolean
}

export function DeleteEntityDialog({
  entityId,
  entityName,
  deleteFn,
  isLoading,
}: DeleteEntityProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          Tem certeza que deseja excluir o(a) {entityName}?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação não pode ser desfeita. Isso irá excluir permanentemente o(a){' '}
          {entityName} e remover todos os dados associados.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>

        <Button
          type="button"
          onClick={() => deleteFn(entityId)}
          className="bg-destructive hover:bg-destructive/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Excluindo...
            </>
          ) : (
            'Excluir'
          )}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
