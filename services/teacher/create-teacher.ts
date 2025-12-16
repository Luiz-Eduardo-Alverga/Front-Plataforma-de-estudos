import { CreateTeacher } from '@/interfaces/teacher'
import api from '@/lib/axios'

export async function createTeacher({
  name,
  email,
  phone,
  admission_date: admissionDate,
  speciality,
  active,
}: CreateTeacher) {
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
