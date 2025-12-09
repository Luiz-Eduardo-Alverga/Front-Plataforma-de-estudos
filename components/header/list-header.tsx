// components/list-header.tsx
'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface ListHeaderProps {
  title: string
  description: string
  newButtonLabel: string
  newButtonHref: string
  hasData: boolean
}

export function ListHeader({
  title,
  description,
  newButtonLabel,
  newButtonHref,
  hasData,
}: ListHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {hasData && (
        <Button
          onClick={() => router.push(`/${newButtonHref}/novo`)}
          className="w-full sm:w-auto bg-yellowButton hover:bg-yellowButton/90 text-black"
        >
          <Plus className="h-4 w-4" />
          {newButtonLabel}
        </Button>
      )}
    </div>
  )
}
