'use client'

import { Professor } from '@/interfaces/professor'
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
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '../ui/switch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfessores } from '@/services/professor/get-professores'
import { FormButton } from '../button/form-button'
import { FormHeader } from '../header/form-header'
import { deleteSubject } from '@/services/subjects/delete-subject'
// import { createSubject } from '@/services/subjects/create-subject'

const createSubjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  workloadHours: z.number(),
  teacherId: z.string(),
  active: z.boolean().nullable(),
  color: z.string(),
})

type CreateSubjectSchema = z.infer<typeof createSubjectSchema>

interface MateriaPageProps {
  mode: 'create' | 'edit'
}

export function MateriaForm({ mode }: MateriaPageProps) {
  const queryClient = useQueryClient()
  const { register, handleSubmit, control } = useForm<CreateSubjectSchema>({
    resolver: zodResolver(createSubjectSchema),
  })

  const { data: professores } = useQuery({
    queryKey: ['professores'],
    queryFn: () => getProfessores({ page: 1 }),
  })

  const { mutateAsync: deleteSubjectFn } = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
    },
  })

  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: createSubject,
  // })

  function handleCreateOrUpdateSubject(data: CreateSubjectSchema) {
    console.log(data)
  }

  return (
    <div className="space-y-6">
      <FormHeader
        handleDelete={() => deleteSubjectFn}
        mode={mode}
        label="Nova"
        title="Matéria"
        description="a Matéria"
      />

      <div>
        <form
          onSubmit={handleSubmit(handleCreateOrUpdateSubject)}
          className="bg-card rounded-lg border p-4 sm:p-6"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Matéria</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Cálculo I"
                  {...register('name')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargaHoraria">Carga Horária (horas)</Label>
                <Input
                  id="cargaHoraria"
                  type="number"
                  placeholder="Ex: 80"
                  {...register('workloadHours')}
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
                {...register('description')}
              />
            </div>

            <div className="grid grid-cols-7 gap-6">
              <div className="space-y-2 col-span-3">
                <Label htmlFor="professor">Professor</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {professores &&
                      professores.data
                        .filter((p: Professor) => p.active)
                        .map((professor) => (
                          <SelectItem key={professor.id} value={professor.name}>
                            {professor.name}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-3">
                <Label htmlFor="cor">Cor</Label>
                <Input id="cor" type="color" {...register('color')} />
              </div>

              <div className="flex gap-2 items-center col-span-2 sm:col-span-1 sm:mt-2 sm:ml-auto">
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="active"
                      checked={field.value ?? true}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="active">Ativar</Label>
              </div>
            </div>
          </div>

          <FormButton mode={mode} isSubmiting />
        </form>
      </div>
    </div>
  )
}
