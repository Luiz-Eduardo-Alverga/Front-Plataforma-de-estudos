import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface FormHeaderProps {
  mode: 'create' | 'edit'
  handleDelete: () => void
  title?: string
  description?: string
}

export function FormHeader({
  handleDelete,
  mode,
  title,
  description,
}: FormHeaderProps) {
  const router = useRouter()

  const defaultTitle = mode === 'create' ? 'Novo Professor' : 'Editar Professor'

  const defaultDescription = `Preencha os campos abaixo para ${
    mode === 'create' ? 'cadastrar' : 'atualizar'
  } o professor`

  const finalTitle = title ?? defaultTitle
  const finalDescription = description ?? defaultDescription

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h2 className="text-lg sm:text-2xl">{finalTitle}</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          {finalDescription}
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

        {mode === 'edit' && (
          <Button
            onClick={handleDelete}
            className="shrink-0 bg-destructive hover:bg-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
