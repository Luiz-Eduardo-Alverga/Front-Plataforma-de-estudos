import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query'
import { getTeachers } from '@/services/teacher/get-teachers'
import { GetTeachersResponse } from '@/interfaces/teacher'

type TeachersInfiniteKey = readonly ['teachers', 'infinite']

export function useInfiniteTeachers() {
  return useInfiniteQuery<
    GetTeachersResponse,
    Error,
    InfiniteData<GetTeachersResponse, number>,
    TeachersInfiniteKey,
    number
  >({
    queryKey: ['teachers', 'infinite'] as const,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getTeachers({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const current = lastPage.meta.current_page
      const last = lastPage.meta.last_page
      return current < last ? current + 1 : undefined
    },
    staleTime: 1000 * 60 * 2,
  })
}
