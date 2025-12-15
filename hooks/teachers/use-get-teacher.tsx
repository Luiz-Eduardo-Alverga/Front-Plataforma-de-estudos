import { getTeacher } from '@/services/teacher/get-teacher'
import { useQuery } from '@tanstack/react-query'

interface UseTeacherProps {
  id: string
  mode: 'edit' | 'create'
}

export function useTeacher({ id, mode }: UseTeacherProps) {
  return useQuery({
    queryKey: ['teacher', id],
    queryFn: () => getTeacher({ teacherId: id }),
    enabled: mode === 'edit',
  })
}
