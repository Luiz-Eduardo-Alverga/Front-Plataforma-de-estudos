import { getSubjects } from '@/services/subjects/get-subjects'
import { useQuery } from '@tanstack/react-query'

interface GetSubjectProps {
  page?: number
}

export function useSubjects({ page }: GetSubjectProps) {
  return useQuery({
    queryKey: ['subjects', page],
    queryFn: () => getSubjects({ page }),
  })
}
