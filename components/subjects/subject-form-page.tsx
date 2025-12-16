'use client'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '../ui/switch'
import { FormButton } from '../button/form-button'
import { FormHeader } from '../header/form-header'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useDeleteSubject } from '@/hooks/subjects/use-delete-subject'
import { useSubject } from '@/hooks/subjects/use-subject'
import { useCreateSubject } from '@/hooks/subjects/use-create-subject'
import { useUpdateSubject } from '@/hooks/subjects/use-update-subject'
import { CreateSubject } from '@/interfaces/subject'
import { TeacherSelectField } from '../selects/teacher-select'

const createSubjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  workloadHours: z.number().max(9999),
  teacherId: z.string(),
  active: z.boolean().nullable(),
  color: z.string(),
})

type CreateSubjectSchema = z.infer<typeof createSubjectSchema>

interface MateriaPageProps {
  id: string
  mode: 'create' | 'edit'
}

export function SubjectForm({ mode, id }: MateriaPageProps) {
  const router = useRouter()

  const { register, handleSubmit, control, setValue } =
    useForm<CreateSubjectSchema>({
      resolver: zodResolver(createSubjectSchema),
      defaultValues: {
        active: true,
      },
    })

  const { data: subject } = useSubject({ id, mode })
  const { mutateAsync: createSubjectFn, isPending } = useCreateSubject()
  const { mutateAsync: updateSubjectFn } = useUpdateSubject()
  const { mutateAsync: deleteSubjectFn, isPending: isDeletingSubject } =
    useDeleteSubject()

  useEffect(() => {
    if (mode === 'edit' && subject) {
      setValue('name', subject.name)
      setValue('description', subject.description)
      setValue('workloadHours', subject.workload_hours)
      setValue('color', subject.color)
      setValue('active', subject.active === 1)

      const teacherId = String(subject.teacher.id)

      const timeout = setTimeout(() => {
        setValue('teacherId', teacherId)
      }, 0)

      return () => clearTimeout(timeout)
    }
  }, [subject, mode, setValue])

  async function handleCreateOrUpdateSubject(data: CreateSubjectSchema) {
    const {
      name,
      description,
      color,
      teacherId,
      workloadHours,
      active: isActive,
    } = data

    const subjectData: CreateSubject = {
      name,
      description,
      color,
      active: isActive ? 1 : 0,
      teacher_id: teacherId,
      workload_hours: Number(workloadHours),
    }

    if (mode === 'create') {
      try {
        await createSubjectFn(subjectData)
        router.back()
        toast.success('Matéria cadastrada com sucesso')
      } catch (error) {
        console.log(error)
      }
    }

    if (mode === 'edit') {
      try {
        await updateSubjectFn({
          subjectId: id,
          subjectData,
        })
        router.back()
        toast.success('Matéria editada com sucesso')
      } catch (error) {
        console.log(error)
      }
    }
  }

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
                  {...register('workloadHours', { valueAsNumber: true })}
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
                <TeacherSelectField
                  control={control}
                  name="teacherId"
                  placeholder="Selecione um professor"
                  onlyActive
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
