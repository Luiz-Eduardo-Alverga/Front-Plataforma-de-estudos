import { CreateExam } from '@/interfaces/exam'
import api from '@/lib/axios'

export async function createExam({
  description,
  duration_minutes: durationMinutes,
  starts_at: startAt,
  status,
  subject_id: subjectId,
  teacher_id: teacherId,
  title,
  type,
  grade,
}: CreateExam) {
  const response = await api.post('/exams', {
    description,
    duration_minutes: durationMinutes,
    starts_at: startAt,
    status,
    subject_id: subjectId,
    teacher_id: teacherId,
    title,
    type,
    grade,
  })

  return response.data
}
