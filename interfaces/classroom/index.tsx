import { PaginationLinks, PaginationMeta } from '../pagination'

export type LessonType = 'online' | 'presencial' | 'hibrida'
export type LessonStatus = 'cancelada' | 'concluida' | 'agendada'

export interface SimpleTeacherSubject {
  id: string
  name: string
}

export interface SimpleTeacher {
  id: string
  name: string
}

export interface Classroom {
  id: string
  title: string
  description: string
  subject: SimpleTeacherSubject
  teacher: SimpleTeacher
  starts_at: string
  duration_minutes: number
  type: LessonType
  status: LessonStatus
}

export interface ClassroomResponse {
  data: Classroom[]
  links: PaginationLinks
  meta: PaginationMeta
}

export interface CreateClassroom {
  title: string
  description: string
  subject_id: string
  teacher_id: string
  starts_at: string
  duration_minutes: number
  type: LessonType
  status: LessonStatus
}
