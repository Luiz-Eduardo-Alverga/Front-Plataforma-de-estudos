import { ExamForm } from '@/components/exams/exam-form-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nova Prova',
}

export default function ExamPage() {
  return <ExamForm mode="create" id="" />
}
