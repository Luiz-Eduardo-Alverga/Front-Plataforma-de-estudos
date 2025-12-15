import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export interface PaginationProps {
  pageIndex: number
  pages: number
}

export function Pagination({ pageIndex, pages }: PaginationProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  function onPageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(newPage))

    router.push(`?${params.toString()}`)
  }

  return (
    <>
      {pages > 0 && (
        <div className="flex items-center justify-between">
          <span className="sr-only text-sm text-muted-foreground">
            Total de {pages} páginas
          </span>

          <div className="flex items-center gap-6 lg:gap-8 ml-auto">
            <div className="text-sm font-medium">
              Página {pageIndex} de {pages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => onPageChange(1)}
                disabled={pageIndex === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">Primeira página</span>
              </Button>

              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => onPageChange(pageIndex - 1)}
                disabled={pageIndex === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Página anterior</span>
              </Button>

              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => onPageChange(pageIndex + 1)}
                disabled={pageIndex >= pages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Próxima página</span>
              </Button>

              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => onPageChange(pages)}
                disabled={pageIndex >= pages}
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Última página</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
