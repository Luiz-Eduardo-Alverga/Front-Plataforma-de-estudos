import { Loader2, Save, X } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface FormButtonProps {
  isSubmiting: boolean
  mode: 'edit' | 'create'
}

export function FormButton({ isSubmiting, mode }: FormButtonProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8">
      <Button
        onClick={() => router.back()}
        type="button"
        variant="outline"
        className="w-full sm:w-auto px-10! gap-4"
      >
        <X className="h-4 w-4" />
        Cancelar
      </Button>

      <Button
        className="w-full sm:w-auto px-10! gap-4"
        type="submit"
        disabled={isSubmiting}
      >
        {isSubmiting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{mode === 'create' ? 'Cadastrando...' : 'Salvando...'}</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>{mode === 'create' ? 'Cadastrar' : 'Salvar'}</span>
          </>
        )}
      </Button>
    </div>
  )
}
