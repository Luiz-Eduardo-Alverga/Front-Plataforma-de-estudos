import { getClassroom } from '@/services/classrooms/get-classroom'
import { useQuery } from '@tanstack/react-query'

interface UseClassroomProps {
  id: string
  mode: 'edit' | 'create'
}

export function useClassroom({ id, mode }: UseClassroomProps) {
  return useQuery({
    queryKey: ['classroom', id],
    queryFn: () => getClassroom({ classroomId: id }),
    enabled: mode === 'edit',
  })
}
