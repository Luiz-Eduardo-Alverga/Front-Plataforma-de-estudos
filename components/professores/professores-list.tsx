'use client'

import { Plus, Edit, Trash2, Mail, Phone, MoreVertical } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

import { useRouter } from 'next/navigation'
import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog'
import { ProfessorDeleteDialog } from './professor-delete'
import { useQuery } from '@tanstack/react-query'
import { getProfessores } from '@/services/professor/get-professores'
import { ProfessorsEmptyState } from './professor-empty-state'

export function ProfessoresList() {
  const router = useRouter()

  const { data: response } = useQuery({
    queryKey: ['professores'],
    queryFn: getProfessores,
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Professores</h2>
          <p className="text-muted-foreground">
            Cadastre e gerencie os professores da plataforma
          </p>
        </div>

        {response && response.data.length > 0 && (
          <Button
            onClick={() => router.push('/professores/novo')}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Novo Professor
          </Button>
        )}
      </div>

      {response && response.data.length === 0 && <ProfessorsEmptyState />}

      {response && response.data.length > 0 && (
        <div className="mt-4 rounded-2xl border overflow-hidden">
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
              {response &&
                response.data.map((professor) => (
                  <TableRow key={professor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="font-medium text-primary">
                            {professor.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{professor.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{professor.speciality}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {professor.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {professor.phone}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          professor.active === 1 ? 'success' : 'secondary'
                        }
                      >
                        {professor.active === 1 ? 'ativo' : 'inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/professores/${professor.id}/editar`,
                                )
                              }
                              className="text-emerald-500 focus:text-emerald-500"
                            >
                              <Edit className="h-4 w-4 mr-2 text-emerald-500" />
                              Editar
                            </DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                                Excluir
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <ProfessorDeleteDialog
                          professorName={professor.name}
                          professorId={professor.id}
                        />
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
