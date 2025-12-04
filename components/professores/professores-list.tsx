'use client'

import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MoreVertical,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
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
import { PROFESSORES_MOCK } from '@/utils/mock/mock-data'
import { useRouter } from 'next/navigation'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { ProfessorDeleteDialog } from './professor-delete'

export function ProfessoresList() {
  const router = useRouter()

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2>Gerenciar Professores</h2>
          <p className="text-muted-foreground">
            Cadastre e gerencie os professores da plataforma
          </p>
        </div>
        <Button
          onClick={() => router.push('/professores/novo')}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Novo Professor
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
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
              {PROFESSORES_MOCK.map((professor) => (
                <TableRow key={professor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="font-medium text-primary">
                          {professor.nome
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{professor.nome}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{professor.especialidade}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {professor.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {professor.telefone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        professor.status === 'ativo' ? 'default' : 'secondary'
                      }
                    >
                      {professor.status}
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
                          
                          <DropdownMenuItem onClick={() => router.push(`/professores/${professor.id}/editar`)} className='text-emerald-500 focus:text-emerald-500'>
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

                      <ProfessorDeleteDialog />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
