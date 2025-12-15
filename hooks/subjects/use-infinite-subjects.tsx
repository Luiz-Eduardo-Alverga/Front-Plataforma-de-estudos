import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query'
import { getSubjects } from '@/services/subjects/get-subjects'
import { SubjectResponse } from '@/interfaces/subject'

type SubjectsInfiniteKey = readonly ['subjects', 'infinite']

export function useInfiniteSubjects() {
  return useInfiniteQuery<
    SubjectResponse,
    Error,
    InfiniteData<SubjectResponse, number>,
    SubjectsInfiniteKey,
    number
  >({
    queryKey: ['subjects', 'infinite'] as const,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getSubjects({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const current = lastPage.meta.current_page
      const last = lastPage.meta.last_page
      return current < last ? current + 1 : undefined
    },
    staleTime: 1000 * 60 * 2,
  })
}
