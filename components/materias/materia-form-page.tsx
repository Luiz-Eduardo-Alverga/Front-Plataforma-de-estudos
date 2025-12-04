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
import { PROFESSORES_MOCK } from '@/utils/mock/mock-data'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MateriaPageProps {
  mode: 'create' | 'edit'
}

export function MateriaForm({ mode }: MateriaPageProps) {
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em produção, aqui faria a chamada para a API
    console.log('Matéria salva')
  }

  const title = mode === 'create' ? 'Nova Matéria' : 'Editar Matéria'

  return (
    <div className="space-y-6">
      <div className="max-w-4xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-2xl">{title}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Preencha os campos abaixo para{' '}
              {mode === 'create' ? 'cadastrar' : 'atualizar'} a matéria
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
            {mode === 'edit' && (
              <Button variant="destructive" size="sm" className="shrink-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-lg border p-4 sm:p-6"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Matéria</Label>
                <Input id="nome" placeholder="Ex: Cálculo I" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargaHoraria">Carga Horária (horas)</Label>
                <Input
                  id="cargaHoraria"
                  type="number"
                  placeholder="Ex: 80"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descrição da matéria"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="professor">Professor</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROFESSORES_MOCK.filter((p) => p.status === 'ativo').map(
                      (professor) => (
                        <SelectItem key={professor.id} value={professor.id}>
                          {professor.nome}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cor">Cor</Label>
                <Input id="cor" type="color" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="inativa">Inativa</SelectItem>
                </SelectContent>
              </Select>
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
