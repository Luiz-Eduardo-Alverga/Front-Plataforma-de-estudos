'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { validateToken } from '@/services/auth/validate-token'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function run() {
      const token = localStorage.getItem('token')

      // Sem token -> pode ver login/register
      if (!token) {
        if (!cancelled) setCanRender(true)
        return
      }

      // Com token -> valida no backend
      try {
        await validateToken()
        if (!cancelled) router.replace('/dashboard')
      } catch {
        // Token inválido/expirado -> limpa e libera login/register
        localStorage.removeItem('token')
        if (!cancelled) setCanRender(true)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [router])

  if (!canRender) return null // ou um loading
  return <>{children}</>
}
