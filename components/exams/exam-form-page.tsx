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
import { useRouter } from 'next/navigation'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormButton } from '../button/form-button'
import { TeacherSelectField } from '../selects/teacher-select'
import { SubjectSelectField } from '../selects/subject-select'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useExam } from '@/hooks/exams/use-get-exam'
import { useCreateExam } from '@/hooks/exams/use-create-exam'
import { useUpdateExam } from '@/hooks/exams/use-update-exam'
import { useDeleteExam } from '@/hooks/exams/use-delete-exam'
import { CreateExam } from '@/interfaces/exam'

const createExamSchema = z.object({
  title: z.string().min(3, 'O título é obrigatório'),
  description: z.string().min(10, 'A descrição deve ter mais de 10 caracteres'),
  durationMinutes: z
    .number()
    .min(1, 'A duração mínima é 1 minuto')
    .max(600, 'A duração máxima é 600 minutos'),
  startsAt: z.string().min(1, 'A data e hora são obrigatórias'),
  subjectId: z.string(),
  teacherId: z.string(),
  type: z.enum(['presencial', 'online', 'hibrida']),
  status: z.enum(['agendada', 'concluida', 'cancelada']),
  grade: z.number().min(0, 'A nota mínima é 0').max(10, 'A nota máxima é 10'),
})

type CreateExamSchema = z.infer<typeof createExamSchema>

interface ExamPageProps {
  id: string
  mode: 'create' | 'edit'
}

export function ExamForm({ mode, id }: ExamPageProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<CreateExamSchema>({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      type: 'presencial',
      status: 'agendada',
    },
  })

  const { data: exam } = useExam({ id, mode })
  const { mutateAsync: createExamFn } = useCreateExam()
  const { mutateAsync: updateExamFn } = useUpdateExam()
  const { mutateAsync: deleteExamFn, isPending: isDeletingExam } =
    useDeleteExam()

  useEffect(() => {
    if (mode === 'edit' && exam) {
      setValue('title', exam.title)
      setValue('description', exam.description)
      setValue('durationMinutes', exam.duration_minutes)
      setValue('type', exam.type)
      setValue('status', exam.status)
      setValue('startsAt', exam.starts_at)
      setValue('durationMinutes', exam.duration_minutes)
      setValue('grade', exam.grade)

      const teacherId = String(exam.teacher.id)
      const subjectId = String(exam.subject.id)

      const timeout = setTimeout(() => {
        setValue('teacherId', teacherId)
        setValue('subjectId', subjectId)
      }, 0)

      return () => clearTimeout(timeout)
    }
  }, [exam, mode, setValue])

  async function handleCreateOrUpdateExam(data: CreateExamSchema) {
    const {
      title,
      description,
      durationMinutes,
      startsAt,
      status,
      subjectId,
      teacherId,
      type,
      grade,
    } = data

    const examData: CreateExam = {
      title,
      description,
      duration_minutes: Number(durationMinutes),
      starts_at: startsAt,
      status,
      subject_id: subjectId,
      teacher_id: teacherId,
      type,
      grade,
    }

    if (mode === 'create') {
      try {
        await createExamFn(examData)
        router.back()
        toast.success('Prova criada com sucesso!')
      } catch (error) {
        console.error('Error creating exam:', error)
      }
    }

    if (mode === 'edit') {
      try {
        await updateExamFn({
          examId: id,
          examData,
        })
        router.back()
        toast.success('Prova editada com sucesso!')
      } catch (error) {
        console.error('Error updating exam:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <FormHeader
        title="Prova"
        mode={mode}
        description="a prova"
        label="Nova"
        entityId={id}
        handleDelete={async (id) => {
          await deleteExamFn({ id })
          router.back()
        }}
        isPending={isDeletingExam}
      />

      <form
        onSubmit={handleSubmit(handleCreateOrUpdateExam)}
        className="bg-card rounded-lg border p-4 sm:p-6"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da Prova</Label>
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
              <Label htmlFor="grade">Valor Total (pontos)</Label>
              <Input
                id="grade"
                type="number"
                placeholder="Ex: 10"
                {...register('grade', { valueAsNumber: true })}
                max={10}
                min={0}
              />
              {errors.grade && (
                <p className="text-sm text-red-600">{errors.grade.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Descrição da prova"
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
                {...register('durationMinutes', { valueAsNumber: true })}
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
