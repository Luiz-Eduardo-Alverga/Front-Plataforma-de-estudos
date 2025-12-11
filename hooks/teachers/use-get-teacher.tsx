import { getProfessor } from '@/services/teacher/get-professor'
import { useQuery } from '@tanstack/react-query'

interface UseTeacherProps {
    id: string
    mode: 'edit' | 'create'
}

export function useTeacher({id, mode}: UseTeacherProps) {

  return useQuery({
      queryKey: ['professor', id],
      queryFn: () => getProfessor({ teacherId: id }),
      enabled: mode === 'edit',
    })
}
