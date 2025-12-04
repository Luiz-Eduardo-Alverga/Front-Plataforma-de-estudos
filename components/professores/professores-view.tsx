import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Badge } from '../ui/badge'
import { Professor } from '@/utils/mock/mock-data'
import { Mail, Phone, Briefcase, Calendar } from 'lucide-react'

interface ProfessorViewProps {
  open: boolean
  onClose: () => void
  professor: Professor | null
}

export function ProfessorView({
  open,
  onClose,
  professor,
}: ProfessorViewProps) {
  if (!professor) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Detalhes do Professor</DialogTitle>
            <Badge
              variant={professor.status === 'ativo' ? 'default' : 'secondary'}
            >
              {professor.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-medium text-primary">
                {professor.nome
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </span>
            </div>
            <div>
              <h3>{professor.nome}</h3>
              <p className="text-muted-foreground">{professor.especialidade}</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-border">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Email</p>
                <p>{professor.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Telefone</p>
                <p>{professor.telefone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Especialidade</p>
                <p>{professor.especialidade}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Data de Admissão</p>
                <p>{formatDate(professor.dataAdmissao)}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
