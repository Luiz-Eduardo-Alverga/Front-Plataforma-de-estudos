import { RegisterUserForm } from '@/components/auth/registrar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registrar',
}

export default function RegisterUserPage() {
  return <RegisterUserForm />
}
