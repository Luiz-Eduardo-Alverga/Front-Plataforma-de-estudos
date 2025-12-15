import { getSubject } from '@/services/subjects/get-subject'
import { useQuery } from '@tanstack/react-query'

interface UseSubectProps {
  mode: 'create' | 'edit'
  id: string
}

export function useSubject({ id, mode }: UseSubectProps) {
  return useQuery({
    queryKey: ['subject', id],
    queryFn: () => getSubject({ subjectId: id }),
    enabled: mode === 'edit',
  })
}
