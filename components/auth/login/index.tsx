'use client'

import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/services/auth/login'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.email('Informe um email válido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type LoginSchema = z.infer<typeof loginSchema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const router = useRouter()

  const { mutateAsync: loginFn } = useMutation({
    mutationFn: login,
  })

  async function handleLogin(data: LoginSchema) {
    try {
      await loginFn({
        email: data.email,
        password: data.password,
      })
      router.push('/dashboard')
      toast.success('Login realizado com sucesso!')
    } catch (error) {
      toast.error('As credenciais informadas estão inválidas')
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl">
              Plataforma de Estudos
            </CardTitle>
            <CardDescription className="text-sm">
              Faça login para acessar o sistema
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <div className="mt-4 text-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link
                href={'/registrar'}
                className="text-primary hover:underline font-medium"
              >
                Registre-se
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
