'use client'

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
import { FormButton } from '../button/form-button'
import { FormHeader } from '../header/form-header'
import { Professor } from '@/interfaces/taecher'
import { createSubject } from '@/services/subjects/create-subject'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getSubject } from '@/services/subjects/get-subject'
import { useEffect } from 'react'
import { useDeleteSubject } from '@/hooks/subjects/use-delete-subject'
import { useTeachers } from '@/hooks/teachers/use-get-teachers'

const createSubjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  workloadHours: z.string(),
  teacherId: z.string(),
  active: z.boolean().nullable(),
  color: z.string(),
})

type CreateSubjectSchema = z.infer<typeof createSubjectSchema>

interface MateriaPageProps {
  id: string
  mode: 'create' | 'edit'
}

export function MateriaForm({ mode, id }: MateriaPageProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { register, handleSubmit, control, setValue } =
    useForm<CreateSubjectSchema>({
      resolver: zodResolver(createSubjectSchema),
      defaultValues: {
        active: true,
      },
    })

  const { data: teachers, isPending: isLoadingTeacher } = useTeachers()
  const { mutateAsync: deleteSubjectFn, isPending: isDeletingSubject } =
    useDeleteSubject()

  const { data: subject } = useQuery({
    queryKey: ['subject', id],
    queryFn: () => getSubject({ subjectId: id }),
    enabled: mode === 'edit',
  })

  useEffect(() => {
    if (mode === 'edit' && subject) {
      setValue('name', subject.name)
      setValue('description', subject.description)
      setValue('workloadHours', String(subject.workload_hours))
      setValue('color', subject.color)
      setValue('active', subject.active === 1)

      const teacherId = String(subject.teacher.id)

      const timeout = setTimeout(() => {
        setValue('teacherId', teacherId)
      }, 0)

      return () => clearTimeout(timeout)
    }
  }, [subject, mode, setValue])

  const { mutateAsync: createSubjectFn, isPending } = useMutation({
    mutationFn: createSubject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subjects'] }),
  })

  async function handleCreateOrUpdateSubject(data: CreateSubjectSchema) {
    const active = data.active ? 1 : 0

    if (mode === 'create') {
      try {
        await createSubjectFn({
          name: data.name,
          description: data.description,
          color: data.color,
          active,
          teacher_id: data.teacherId,
          workload_hours: Number(data.workloadHours),
        })
        router.back()
        toast.success('Matéria cadastrada com sucesso')
      } catch (error) {
        console.log(error)
      }
    }

    if (mode === 'edit') {
      try {
        router.back()
        toast.success('Matéria editada com sucesso')
      } catch (error) {
        console.log(error)
      }
    }
  }
  console.log(id)

  return (
    <div className="space-y-6">
      <FormHeader
        isPending={isDeletingSubject}
        entityId={id}
        handleDelete={async (id) => {
          await deleteSubjectFn({ id })
          router.back()
        }}
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
                {...register('description')}
              />
            </div>

            <div className="grid grid-cols-7 gap-6">
              <div className="space-y-2 col-span-3">
                <Label htmlFor="professor">Professor</Label>
                <Controller
                  name="teacherId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um professor" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingTeacher ? (
                          <SelectItem value="carregando">
                            Carregando...
                          </SelectItem>
                        ) : (
                          teachers &&
                          teachers.data
                            .filter((p: Professor) => p.active)
                            .map((professor) => (
                              <SelectItem
                                key={professor.id}
                                value={String(professor.id)}
                              >
                                {professor.name}
                              </SelectItem>
                            ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
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

          <FormButton mode={mode} isSubmiting={isPending} />
        </form>
      </div>
    </div>
  )
}
