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
import { useClassrooms } from '@/hooks/classrooms/use-classrooms'
import { Pagination } from '../pagination'
import { useSearchParams } from 'next/navigation'
import { UseDeleteClassroom } from '@/hooks/classrooms/use-delete-classroom'
import { DeleteEntityDialog } from '../modal/delete-entity'

export function ClassroomsList() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') || '1')

  const { data: response } = useClassrooms({
    page,
  })
  const { mutateAsync: deleteClassroomFn, isPending } = UseDeleteClassroom()

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
  ): 'default' | 'success' | 'secondary' => {
    switch (status) {
      case 'agendada':
        return 'default'
      case 'concluida':
        return 'success'
      case 'cancelada':
        return 'secondary'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-4">
      <ListHeader
        title="Gerenciar Aulas"
        description="Cadastre e gerencie as aulas da plataforma"
        hasData
        newButtonLabel="Nova Aula"
        newButtonHref="aulas"
      />

      <div className="mt-4 rounded-lg border overflow-hidden shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aula</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response &&
              response.data.map((classroom) => (
                <TableRow key={classroom.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{classroom.title}</p>
                      <p className="text-muted-foreground">
                        {classroom.subject.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(classroom.starts_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(classroom.starts_at)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {classroom.type === 'presencial' ? (
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="capitalize">{classroom.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{classroom.duration_minutes} min</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(classroom.status)}>
                      {classroom.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <TableDropdwonMenu itemHref="aulas" id={classroom.id} />

                      <DeleteEntityDialog
                        deleteFn={async (id) => {
                          await deleteClassroomFn({ id })
                        }}
                        entityId={String(classroom.id)}
                        entityName="aula"
                        isLoading={isPending}
                      />
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {response?.meta && response.meta.last_page > 1 && (
        <Pagination pageIndex={page} pages={response.meta.last_page} />
      )}
    </div>
  )
}
