'use client'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProfessorFormProps {
  mode: 'create' | 'edit'
}

export function ProfessorForm({ mode }: ProfessorFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Professor salvo')
  }
  const router = useRouter()

  const title = mode === 'create' ? 'Novo Professor' : 'Editar Professor'

  return (
    <div className="space-y-6">
      <div className="max-w-4xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-2xl">{title}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Preencha os campos abaixo para{' '}
              {mode === 'create' ? 'cadastrar' : 'atualizar'} o professor
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="sm"
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-lg border p-4 sm:p-6"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" placeholder="Ex: Dr. Carlos Silva" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="professor@escola.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" type="tel" placeholder="(11) 98765-4321" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="especialidade">Especialidade</Label>
                <Input id="especialidade" placeholder="Ex: Matemática" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataAdmissao">Data de Admissão</Label>
                <Input id="dataAdmissao" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="biografia">Biografia</Label>
              <Textarea
                id="biografia"
                placeholder="Escreva uma breve biografia do professor"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8">
            <Button
              onClick={() => router.back()}
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {mode === 'create' ? 'Cadastrar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
