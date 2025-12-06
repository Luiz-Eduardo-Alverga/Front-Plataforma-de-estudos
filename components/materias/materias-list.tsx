'use client'

import { Plus, Edit, Trash2, MoreVertical } from 'lucide-react'
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
import { MATERIAS_MOCK } from '@/utils/mock/mock-data'
import { useRouter } from 'next/navigation'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { MateriaDeleteDialog } from './materia-delete'

export function MateriasList() {
  const router = useRouter()

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2>Gerenciar Matérias</h2>
          <p className="text-muted-foreground">
            Cadastre e gerencie as matérias da plataforma
          </p>
        </div>
        <Button
          className="w-full sm:w-auto"
          onClick={() => router.push('/materias/novo')}
        >
          <Plus className="h-4 w-4" />
          Nova Matéria
        </Button>
      </div>

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
            {MATERIAS_MOCK.map((materia) => (
              <TableRow key={materia.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: materia.cor }}
                    />
                    <div>
                      <p className="font-medium">{materia.nome}</p>
                      <p className="text-muted-foreground line-clamp-1">
                        {materia.descricao}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{materia.professorNome}</TableCell>
                <TableCell>{materia.cargaHoraria}h</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      materia.status === 'ativa' ? 'success' : 'secondary'
                    }
                  >
                    {materia.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-emerald-500 focus:text-emerald-500"
                          onClick={() =>
                            router.push(`/materias/${materia.id}/editar`)
                          }
                        >
                          <Edit className="h-4 w-4 mr-2 text-emerald-500" />
                          Editar
                        </DropdownMenuItem>
                        <DialogTrigger asChild>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                            Excluir
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <MateriaDeleteDialog />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
