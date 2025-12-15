import { CreateClassroom } from '@/interfaces/classroom'
import api from '@/lib/axios'

export async function createClassroom({
  description,
  duration_minutes: durationMinutes,
  starts_at: startAt,
  status,
  subject_id: subjectId,
  teacher_id: teacherId,
  title,
  type,
}: CreateClassroom) {
  const response = await api.post('/classrooms', {
    description,
    duration_minutes: durationMinutes,
    starts_at: startAt,
    status,
    subject_id: subjectId,
    teacher_id: teacherId,
    title,
    type,
  })

  return response.data
}
