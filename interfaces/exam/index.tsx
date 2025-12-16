import { SimpleTeacher, SimpleTeacherSubject } from '../teacher'
import { PaginationLinks, PaginationMeta } from '../pagination'

export type LessonType = 'online' | 'presencial' | 'hibrida'
export type LessonStatus = 'cancelada' | 'concluida' | 'agendada'

export interface Exam {
  id: string
  title: string
  description: string
  subject: SimpleTeacherSubject
  teacher: SimpleTeacher
  starts_at: string
  duration_minutes: number
  type: LessonType
  status: LessonStatus
  grade: number
}

export interface ExamResponse {
  data: Exam[]
  links: PaginationLinks
  meta: PaginationMeta
}

export interface CreateExam {
  title: string
  description: string
  subject_id: string
  teacher_id: string
  starts_at: string
  duration_minutes: number
  type: LessonType
  status: LessonStatus
  grade: number
}

export interface UpdateExam {
  examId: string
  examData: CreateExam
}
