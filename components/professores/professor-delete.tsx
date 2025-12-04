import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Professor } from '@/utils/mock/mock-data'
import { AlertTriangle } from 'lucide-react'

interface ProfessorDeleteProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  professor: Professor | null
}

export function ProfessorDelete({
  open,
  onClose,
  onConfirm,
  professor,
}: ProfessorDeleteProps) {
  if (!professor) return null

  const handleConfirm = () => {
    console.log('Professor deletado:', professor.id)
    onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          <p>Tem certeza que deseja excluir o professor:</p>
          <p className="font-medium">{professor.nome}</p>
          <p className="text-muted-foreground">
            Todas as matérias e aulas associadas a este professor também serão
            afetadas.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
