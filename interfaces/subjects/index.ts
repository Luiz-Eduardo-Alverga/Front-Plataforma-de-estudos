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
