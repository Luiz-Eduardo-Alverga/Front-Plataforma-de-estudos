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
import { useUpdateTeacher } from '@/hooks/teachers/use-update-teacher'
import { useDeleteTeacher } from '@/hooks/teachers/use-delete-teacher'
import { useTeacher } from '@/hooks/teachers/use-get-teacher'
import { CreateTeacher } from '@/interfaces/teacher'
import { NumberFormatBase } from 'react-number-format'

const createTeacherFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.email('Email inválido'),
  phone: z
    .string()
    .refine((v) => v.length === 10 || v.length === 11, 'Telefone inválido'),
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

  const { data: teacher } = useTeacher({ id, mode })
  const { mutateAsync: createTeacherFn, isPending: isCreatingTeacher } =
    useCreateTeacher()
  const { mutateAsync: updateTeacherFn, isPending: isUpdatingTeacher } =
    useUpdateTeacher()
  const { mutateAsync: deleteTeacherFn, isPending } = useDeleteTeacher()

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

  async function handleCreateOrUpdateTeacher(data: CreateTeacherFormData) {
    const {
      name,
      admissionDate,
      email,
      phone,
      speciality,
      active: isActive,
    } = data

    const teacherData: CreateTeacher = {
      name,
      admission_date: admissionDate,
      email,
      phone,
      speciality,
      active: isActive ? 1 : 0,
    }

    if (mode === 'create') {
      try {
        await createTeacherFn(teacherData)
        router.back()
        toast.success('Professor criado com sucesso!')
      } catch (error) {
        console.error('Erro ao criar professor:', error)
      }
    }

    if (mode === 'edit' && teacher) {
      try {
        await updateTeacherFn({
          teacherId: teacher.id,
          teacherData,
        })
        router.back()
        toast.success('Professor editado com sucesso!')
      } catch (error) {
        console.error('Erro ao editar professor:', error)
      }
    }
  }

  const onlyDigits = (v: string) => v.replace(/\D/g, '').slice(0, 11)

  const formatPhone = (value: string) => {
    const d = onlyDigits(value)
    if (!d) return ''

    const ddd = d.slice(0, 2)
    const rest = d.slice(2)

    if (d.length <= 10) {
      const p1 = rest.slice(0, 4)
      const p2 = rest.slice(4, 8)
      return `(${ddd}) ${p2 ? `${p1}-${p2}` : p1}`
    }

    const p1 = rest.slice(0, 5)
    const p2 = rest.slice(5, 9)
    return `(${ddd}) ${p2 ? `${p1}-${p2}` : p1}`
  }

  return (
    <div className="space-y-6">
      <FormHeader
        isPending={isPending}
        entityId={id}
        mode={mode}
        handleDelete={async (id) => {
          await deleteTeacherFn({ id })
          router.back()
        }}
        label="Novo"
        title="Professor"
        description="o professor"
      />

      <form
        onSubmit={handleSubmit(handleCreateOrUpdateTeacher)}
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
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <NumberFormatBase
                    customInput={Input}
                    value={field.value ?? ''}
                    format={(val) => formatPhone(val)}
                    removeFormatting={(val) => onlyDigits(val)}
                    onValueChange={(values) => field.onChange(values.value)}
                    inputMode="numeric"
                    placeholder="(83) 3225-7000"
                  />
                )}
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
