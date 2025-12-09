import { PaginationLinks, PaginationMeta } from '../pagination'

export interface Professor {
  id: string
  name: string
  email: string
  phone: string
  admissionDate: string
  speciality: string
  active: 0 | 1
}

export interface GetProfessoresResponse {
  data: Professor[]
  links: PaginationLinks
  meta: PaginationMeta
}

export interface CreateProfessorProps {
  name: string
  email?: string
  phone: string
  admission_date?: string
  speciality?: string
  active: 0 | 1
}
export interface UpdateProfessorProps {
  teacherId: string
  teacherData: CreateProfessorProps
}
