'use client'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useRouter } from 'next/navigation'
import z from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '../ui/switch'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { FormHeader } from '../header/form-header'
import { FormButton } from '../button/form-button'
import { useCreateTeacher } from '@/hooks/teachers/use-create-teacher'
import { useEditTeacher } from '@/hooks/teachers/use-edit-teacher'
import { useDeleteTeacher } from '@/hooks/teachers/use-delete-teacher'
import { useTeacher } from '@/hooks/teachers/use-get-teacher'

const createTeacherFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  speciality: z.string().nullable(),
  admissionDate: z.string().nullable(),
  active: z.boolean().nullable(),
})

type CreateTeacherFormData = z.infer<typeof createTeacherFormSchema>

interface TeacherFormProps {
  id: string
  mode: 'create' | 'edit'
}

export function TeacherForm({ mode, id }: TeacherFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateTeacherFormData>({
    resolver: zodResolver(createTeacherFormSchema),
    defaultValues: {
      active: true,
    },
  })

  const { mutateAsync: createProfessorFn, isPending: isCreatingTeacher } =
    useCreateTeacher()
  const { mutateAsync: updateProfessorFn, isPending: isUpdatingTeacher } =
    useEditTeacher()
  const { mutateAsync: deleteProfessorFn, isPending } = useDeleteTeacher()
  const { data: teacher } = useTeacher({ id, mode })

  const isSubmitingTeacher =
    mode === 'create' ? isCreatingTeacher : isUpdatingTeacher

  useEffect(() => {
    if (mode === 'edit' && teacher) {
      setValue('name', teacher.name)
      setValue('email', teacher.email)
      setValue('phone', teacher.phone)
      setValue('speciality', teacher.speciality)
      setValue(
        'admissionDate',
        teacher.admissionDate
          ? new Date(teacher.admissionDate).toISOString().split('T')[0]
          : '',
      )
      setValue('active', teacher.active === 1)
    }
  }, [teacher, mode, setValue])

  async function handleCreateOrUpdateProfessor(data: CreateTeacherFormData) {
    const active = data.active ? 1 : 0

    if (mode === 'create') {
      try {
        await createProfessorFn({
          name: data.name,
          email: data.email,
          phone: data.phone,
          speciality: data.speciality || undefined,
          admission_date: data.admissionDate || undefined,
          active,
        })

        router.back()
        toast.success('Professor criado com sucesso!')
      } catch (error) {
        console.error('Erro ao criar professor:', error)
      }
    }

    if (mode === 'edit' && teacher) {
      try {
        await updateProfessorFn({
          teacherId: teacher.id,
          teacherData: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            speciality: data.speciality || undefined,
            admission_date: data.admissionDate || undefined,
            active,
          },
        })

        router.back()
        toast.success('Professor editado com sucesso!')
      } catch (error) {
        console.error('Erro ao editar professor:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <FormHeader
        isPending={isPending}
        entityId={id}
        mode={mode}
        handleDelete={async (id) => {
          await deleteProfessorFn({ id })
          router.back()
        }}
        label="Novo"
        title="Professor"
        description="o professor"
      />

      <form
        onSubmit={handleSubmit(handleCreateOrUpdateProfessor)}
        className="bg-card rounded-lg border p-4 sm:p-6"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-5 gap-6">
            <div
              className={`space-y-2 ${
                mode === 'create' ? 'col-span-5' : 'col-span-4'
              }`}
            >
              <Label htmlFor="nome">Nome Completo</Label>
              <Input {...register('name')} placeholder="Ex: Dr. Carlos Silva" />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {mode === 'edit' && teacher && (
              <div className="space-y-2 col-span-1">
                <Label htmlFor="codigo">Código</Label>
                <Input value={teacher?.id} disabled />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email')}
                type="email"
                placeholder="professor@escola.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                {...register('phone')}
                type="tel"
                placeholder="(11) 98765-4321"
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-6 items-end ">
            <div className="space-y-2 col-span-7 sm:col-span-3">
              <Label htmlFor="especialidade">Especialidade</Label>
              <Input {...register('speciality')} placeholder="Ex: Matemática" />
            </div>

            <div className="space-y-2 col-span-5 sm:col-span-3">
              <Label htmlFor="dataAdmissao">Data de Admissão</Label>
              <Input {...register('admissionDate')} type="date" />
            </div>

            <div className="flex gap-2 items-center col-span-2 sm:col-span-1 sm:mb-2 sm:ml-auto">
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

        <FormButton mode={mode} isSubmiting={isSubmitingTeacher} />
      </form>
    </div>
  )
}
