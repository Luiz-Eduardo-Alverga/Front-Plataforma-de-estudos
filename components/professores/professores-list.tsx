'use client'

import { Mail, Phone } from 'lucide-react'
import { Badge } from '../ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

import { useRouter, useSearchParams } from 'next/navigation'
import { AlertDialog } from '../ui/alert-dialog'
import EmptyStateImage from '@/public/undraw_professor_d7zn.svg'
import { Pagination } from '../pagination'
import { ListHeader } from '../header/list-header'
import { TableDropdwonMenu } from '../dropdown/table-dropdown-menu'

import { DeleteEntityDialog } from '../modal/delet-entity'
import { EmptyState } from '../empty-state'
import { useDeleteTeacher } from '@/hooks/teachers/use-delete-teacher'
import { useTeachers } from '@/hooks/teachers/use-get-teachers'

export function ProfessoresList() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const router = useRouter()
  const { data: response } = useTeachers()

  const { mutateAsync: deleteProfessorFn, isPending } = useDeleteTeacher()

  function handlePaginate(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(newPage))

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <ListHeader
        title="Professores"
        description="Cadastre e gerencie os professores da plataforma"
        newButtonLabel="Novo Professor"
        newButtonHref="professores"
        hasData={!!response && response.data.length > 0}
      />

      {!response ||
        (response.data.length === 0 && (
          <EmptyState
            title="Nenhum professor cadastrado"
            description="Comece adicionando professores à plataforma para gerenciar suas
          especialidades e disciplinas."
            footerText="Adicionar Primeiro Professor"
            image={EmptyStateImage}
            href="professores"
          />
        ))}

      {response && response.data.length > 0 && (
        <div className="mt-4 rounded-lg border overflow-hidden shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Professor</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response.data.map((response) => (
                <TableRow key={response.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="font-medium text-primary">
                          {response.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{response.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{response.speciality}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {response.email || 'Não informado'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {response.phone || 'Não informado'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={response.active === 1 ? 'success' : 'secondary'}
                    >
                      {response.active === 1 ? 'ativo' : 'inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <TableDropdwonMenu
                        itemHref="professores"
                        id={response.id}
                      />

                      <DeleteEntityDialog
                        deleteFn={async (id) => {
                          await deleteProfessorFn({ id })
                        }}
                        entityId={String(response.id)}
                        entityName="professor"
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
