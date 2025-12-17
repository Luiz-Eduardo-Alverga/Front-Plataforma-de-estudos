'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { setOnUnauthorized } from '@/lib/axios'
import toast from 'react-hot-toast'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    setOnUnauthorized(() => {
      toast.error('Sua sessão expirou. Por favor, faça login novamente.', {
        id: 'session-expired', // evita repetir várias vezes
      })
      router.replace('/login')
    })

    return () => setOnUnauthorized(null)
  }, [router])

  return <>{children}</>
}
