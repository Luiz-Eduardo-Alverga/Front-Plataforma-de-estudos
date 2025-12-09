import { CreateProfessorProps } from '@/interfaces/taecher'
import api from '@/lib/axios'

export async function createProfessor({
  name,
  email,
  phone,
  admission_date: admissionDate,
  speciality,
  active,
}: CreateProfessorProps) {
  const response = await api.post('/teachers', {
    name,
    email,
    phone,
    admission_date: admissionDate,
    speciality,
    active,
  })

  return response.data
}
