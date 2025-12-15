import { PaginationLinks, PaginationMeta } from '../pagination'

export interface Subject {
  id: string
  name: string
  workload_hours: number
  description: string
  teacher: {
    id: string
    name: string
  }
  color: string
  active: 0 | 1
}

export interface SubjectResponse {
  data: Subject[]
  links: PaginationLinks
  meta: PaginationMeta
}

export interface CreateSubject {
  name: string
  workload_hours: number
  description: string
  teacher_id: string
  color: string
  active: 0 | 1
}

export interface UpdateSubject {
  subjectId: string
  subjectData: CreateSubject
}
