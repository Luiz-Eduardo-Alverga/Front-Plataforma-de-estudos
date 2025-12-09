'use client'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useRouter } from 'next/navigation'
import z from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '../ui/switch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProfessor } from '@/services/professor/create-professor'
import toast from 'react-hot-toast'
import { getProfessor } from '@/services/professor/get-professor'
import { useEffect } from 'react'
import { updateProfessor } from '@/services/professor/update-professor'
import { deleteProfessor } from '@/services/professor/delete-professor'
import { FormHeader } from '../header/form-header'
import { FormButton } from '../button/form-button'

const createProfessorFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  speciality: z.string().nullable(),
  admissionDate: z.string().nullable(),
  active: z.boolean().nullable(),
})

type CreateProfessorFormData = z.infer<typeof createProfessorFormSchema>

interface ProfessorFormProps {
  id: string
  mode: 'create' | 'edit'
}

export function ProfessorForm({ mode, id }: ProfessorFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateProfessorFormData>({
    resolver: zodResolver(createProfessorFormSchema),
    defaultValues: {
      active: true,
    },
  })

  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: professor } = useQuery({
    queryKey: ['professor', id],
    queryFn: () => getProfessor({ teacherId: id }),
    enabled: mode === 'edit',
  })

  useEffect(() => {
    if (mode === 'edit' && professor) {
      setValue('name', professor.name)
      setValue('email', professor.email)
      setValue('phone', professor.phone)
      setValue('speciality', professor.speciality || '')
      setValue(
        'admissionDate',
        professor.admissionDate
          ? new Date(professor.admissionDate).toISOString().split('T')[0]
          : '',
      )
      setValue('active', professor.active === 1)
    }
  }, [professor, mode, setValue])

  const { mutateAsync: createProfessorFn, isPending: isCreatingProfessor } =
    useMutation({
      mutationFn: createProfessor,
    })
  const { mutateAsync: updateProfessorFn, isPending: isUpdatingProfessor } =
    useMutation({
      mutationFn: updateProfessor,
    })

  const isSubmittingProfessor =
    mode === 'create' ? isCreatingProfessor : isUpdatingProfessor

  const { mutateAsync: deleteProfessorFn } = useMutation({
    mutationFn: (id: string) => deleteProfessor({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professores'] })
    },
  })

  async function handleCreateOrUpdateProfessor(data: CreateProfessorFormData) {
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

    if (mode === 'edit' && professor) {
      try {
        await updateProfessorFn({
          teacherId: professor.id,
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

  async function handleDeleteProfessor() {
    if (!professor) return

    try {
      await deleteProfessorFn(professor.id)
      router.back()
      toast.success('Professor deletado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="space-y-6">
      <FormHeader mode={mode} handleDelete={handleDeleteProfessor} />

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

            {mode === 'edit' && professor && (
              <div className="space-y-2 col-span-1">
                <Label htmlFor="codigo">Código</Label>
                <Input value={professor?.id} disabled />
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

          <div className="grid grid-cols-7 gap-6 items-end">
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

        <FormButton mode={mode} isSubmiting={isSubmittingProfessor} />
      </form>
    </div>
  )
}
