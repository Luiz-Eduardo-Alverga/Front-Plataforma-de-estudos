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
import { FormHeader } from '../header/form-header'
import { UseDeleteClassroom } from '@/hooks/classrooms/use-delete-classroom'
import { useRouter } from 'next/navigation'
import { useClassroom } from '@/hooks/classrooms/use-get-classroom'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormButton } from '../button/form-button'
import { TeacherSelectField } from '../selects/teacher-select'
import { SubjectSelectField } from '../selects/subject-select'
import { useCreateClassroom } from '@/hooks/classrooms/use-create-classroom'
import toast from 'react-hot-toast'

const createClassroomSchema = z.object({
  title: z.string().min(3, 'O título é obrigatório'),
  description: z.string().min(10, 'A descrição deve ter mais de 10 caracteres'),
  durationMinutes: z.string().min(1, 'A duração é obrigatória'),
  startsAt: z.string().min(1, 'A data e hora são obrigatórias'),
  subjectId: z.string(),
  teacherId: z.string(),
  type: z.enum(['presencial', 'online', 'hibrida']),
  status: z.enum(['agendada', 'concluida', 'cancelada']),
})

type CreateClassroomSchema = z.infer<typeof createClassroomSchema>

interface AulaPageProps {
  id: string
  mode: 'create' | 'edit'
}

export function ClassroomForm({ mode, id }: AulaPageProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<CreateClassroomSchema>({
    resolver: zodResolver(createClassroomSchema),
    defaultValues: {
      type: 'presencial',
      status: 'agendada',
    },
  })

  const { data } = useClassroom({
    id,
    mode,
  })
  console.log('classroom data:', data)

  const { mutateAsync: createClassroomFn } = useCreateClassroom()
  const { mutateAsync: deleteClassroomFn, isPending: isDeletingClassroom } =
    UseDeleteClassroom()

  async function handleCreateOrUpdateClassroom(data: CreateClassroomSchema) {
    if (mode === 'create') {
      try {
        await createClassroomFn({
          title: data.title,
          description: data.description,
          duration_minutes: Number(data.durationMinutes),
          starts_at: data.startsAt,
          subject_id: data.subjectId,
          teacher_id: data.teacherId,
          type: data.type,
          status: data.status,
        })
        router.back()
        toast.success('Aula criada com sucesso!')
      } catch (error) {
        console.error('Error creating classroom:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <FormHeader
        title="Aula"
        mode={mode}
        description="a aula"
        label="Nova"
        entityId={id}
        handleDelete={async (id) => {
          await deleteClassroomFn({ id })
          router.back()
        }}
        isPending={isDeletingClassroom}
      />

      <form
        onSubmit={handleSubmit(handleCreateOrUpdateClassroom)}
        className="bg-card rounded-lg border p-4 sm:p-6"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título da Aula</Label>
            <Input
              id="titulo"
              placeholder="Ex: Introdução aos Limites"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Descrição da aula"
              rows={4}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="materia">Matéria</Label>
              <SubjectSelectField
                control={control}
                name="subjectId"
                placeholder="Selecione uma matéria"
                onlyActive
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="professor">Professor</Label>
              <TeacherSelectField
                control={control}
                name="teacherId"
                placeholder="Selecione um professor"
                onlyActive
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dataHora">Data e Hora</Label>
              <Input
                id="dataHora"
                type="datetime-local"
                {...register('startsAt')}
              />
              {errors.startsAt && (
                <p className="text-sm text-red-600">
                  {errors.startsAt.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracao">Duração (minutos)</Label>
              <Input
                id="duracao"
                type="number"
                placeholder="Ex: 90"
                {...register('durationMinutes')}
              />
              {errors.durationMinutes && (
                <p className="text-sm text-red-600">
                  {errors.durationMinutes.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="hibrida">Híbrida</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agendada">Agendada</SelectItem>
                      <SelectItem value="concluida">Concluída</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        <FormButton mode={mode} isSubmiting={isSubmitting} />
      </form>
    </div>
  )
}
