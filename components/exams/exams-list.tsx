'use client'

import { Calendar, Clock, MapPin, Monitor } from 'lucide-react'
import { Badge } from '../ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { ListHeader } from '../header/list-header'
import { AlertDialog } from '../ui/alert-dialog'
import { TableDropdwonMenu } from '../dropdown/table-dropdown-menu'
import { Pagination } from '../pagination'
import { useSearchParams } from 'next/navigation'
import { DeleteEntityDialog } from '../modal/delete-entity'
import { EmptyState } from '../empty-state'
import EmptyStateImage from '@/public/undraw_online-learning_tgmv.svg'
import { useExams } from '@/hooks/exams/use-exams'
import { useDeleteExam } from '@/hooks/exams/use-delete-exam'

export function ExamsList() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') || '1')

  const { data: response } = useExams({
    page,
  })
  const { mutateAsync: deleteExamFn, isPending } = useDeleteExam()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusVariant = (
    status: string,
  ): 'default' | 'success' | 'secondary' | 'destructive' => {
    switch (status) {
      case 'agendada':
        return 'default'
      case 'concluida':
        return 'success'
      case 'cancelada':
        return 'destructive'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-4">
      <ListHeader
        title="Gerenciar Provas"
        description="Cadastre e gerencie as provas da plataforma"
        hasData={!!response && response.data.length > 0}
        newButtonLabel="Nova prova"
        newButtonHref="provas"
      />

      {!response ||
        (response.data.length === 0 && (
          <EmptyState
            title="Nenhuma prova cadastrada"
            description="Comece adicionando provas à plataforma para organizar o cronograma de ensino."
            footerText="Adicionar Primeira prova"
            image={EmptyStateImage}
            href="provas"
          />
        ))}

      {response && response.data.length > 0 && (
        <div className="mt-4 rounded-lg border overflow-hidden shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prova</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response &&
                response.data.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{exam.title}</p>
                        <p className="text-muted-foreground">
                          {exam.subject.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(exam.starts_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(exam.starts_at)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {exam.type === 'presencial' ? (
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Monitor className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="capitalize">{exam.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{exam.duration_minutes} min</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(exam.status)}>
                        {exam.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <TableDropdwonMenu itemHref="provas" id={exam.id} />

                        <DeleteEntityDialog
                          deleteFn={async (id) => {
                            await deleteExamFn({ id })
                          }}
                          entityId={String(exam.id)}
                          entityName="prova"
                          isLoading={isPending}
                        />
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}

      {response?.meta && response.meta.last_page > 1 && (
        <Pagination pageIndex={page} pages={response.meta.last_page} />
      )}
    </div>
  )
}
