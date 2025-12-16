import { PaginationLinks, PaginationMeta } from '../pagination'

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  admissionDate: string
  speciality: string
  active: 0 | 1
}

export interface GetTeachersResponse {
  data: Teacher[]
  links: PaginationLinks
  meta: PaginationMeta
}

export interface CreateTeacher {
  name: string
  email?: string | null
  phone: string
  admission_date?: string | null
  speciality?: string | null
  active: 0 | 1
}
export interface UpdateTeacher {
  teacherId: string
  teacherData: CreateTeacher
}

export interface SimpleTeacherSubject {
  id: string
  name: string
}

export interface SimpleTeacher {
  id: string
  name: string
}
