import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog'
import { DeleteEntityDialog } from '../modal/delete-entity'

interface FormHeaderProps {
  mode: 'create' | 'edit'
  handleDelete: (id: string) => Promise<void> | void
  title?: string
  description?: string
  label: string
  entityId: string
  isPending: boolean
}

export function FormHeader({
  handleDelete,
  mode,
  title,
  description,
  label,
  entityId,
  isPending,
}: FormHeaderProps) {
  const router = useRouter()

  const defaultTitle =
    mode === 'create' ? `${label} ${title}` : `Editar ${title}`

  const defaultDescription = `Preencha os campos abaixo para ${
    mode === 'create' ? 'cadastrar' : 'atualizar'
  } ${description}`

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h2 className="text-lg sm:text-2xl">{defaultTitle}</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          {defaultDescription}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => router.back()}
          className="bg-white text-black hover:bg-white/70 flex-1"
        >
          <ArrowLeft className="h-4 w-4 text-black" />
          Voltar
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            {mode === 'edit' && (
              <Button className="shrink-0 bg-destructive hover:bg-destructive/90">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </AlertDialogTrigger>

          <DeleteEntityDialog
            deleteFn={handleDelete}
            entityId={entityId}
            entityName={title || ''}
            isLoading={isPending}
          />
        </AlertDialog>
      </div>
    </div>
  )
}
