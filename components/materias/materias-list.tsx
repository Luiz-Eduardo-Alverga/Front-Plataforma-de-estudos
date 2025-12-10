'use client'

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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSubjects } from '@/services/subjects/get-subjects'
import { AlertDialog } from '../ui/alert-dialog'
import { TableDropdwonMenu } from '../dropdown/table-dropdown-menu'
import { DeleteEntityDialog } from '../modal/delet-entity'
import { deleteSubject } from '@/services/subjects/delete-subject'
import { Pagination } from '../pagination'
import { useSearchParams, useRouter } from 'next/navigation'
import { EmptyState } from '../empty-state'
import EmptyStateImage from '@/public/undraw_teaching_58yg.svg'

export function MateriasList() {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const router = useRouter()
  const page = Number(searchParams.get('page') ?? '1')

  const { data: response } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects,
  })

  const { mutateAsync: deleteSubjectFn, isPending } = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
    },
  })

  function handlePaginate(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(newPage))

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <ListHeader
        title="Matérias"
        description="Cadastre e gerencie as matérias da plataforma"
        newButtonLabel="Nova Matéria"
        newButtonHref="materias"
        hasData={true && true}
      />

      {!response ||
        (response.data.length === 0 && (
          <EmptyState
            title="Nenhuma matéria cadastrada"
            description="Comece adicionando matérias à plataforma para gerenciar os horários das suas aulas"
            footerText="Adicionar Primeira Matéria"
            image={EmptyStateImage}
          />
        ))}

      {response && response.data.length > 0 && (
        <div className="mt-4 rounded-2xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matéria</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead>Carga Horária</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response &&
                response.data.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: subject.color }}
                        />
                        <div>
                          <p className="font-medium">{subject.name}</p>
                          <p className="text-muted-foreground line-clamp-1">
                            {subject.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{subject.teacher.name}</TableCell>
                    <TableCell>{subject.workload_hours}h</TableCell>
                    <TableCell>
                      <Badge variant={subject.active ? 'success' : 'secondary'}>
                        {subject.active ? 'ativo' : 'inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <TableDropdwonMenu
                          itemHref="materias"
                          id={subject.id}
                        />

                        <DeleteEntityDialog
                          deleteFn={async (id) => {
                            await deleteSubjectFn({ id })
                          }}
                          entityId={String(subject.id)}
                          entityName="matéria"
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

      {response && response.meta.last_page > 1 && (
        <Pagination
          pageIndex={page}
          pages={response.meta.last_page}
          onPageChange={handlePaginate}
        />
      )}
    </div>
  )
}
