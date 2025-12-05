export interface Professor {
  id: string
  name: string
  email: string
  phone: string
  admissionDate: string
  speciality: string
  active: 0 | 1
}

interface PaginationLinkItem {
  url: string | null
  label: string
  page: number | null
  active: boolean
}

interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  links: PaginationLinkItem[]
  path: string
  per_page: number
  to: number
  total: number
}

interface PaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface GetProfessoresResponse {
  data: Professor[]
  links: PaginationLinks
  meta: PaginationMeta
}
