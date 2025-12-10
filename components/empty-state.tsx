import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface EmptyStateProps {
  title: string
  description: string
  footerText: string
  image: string
}

export function EmptyState({
  description,
  footerText,
  image,
  title,
}: EmptyStateProps) {
  const router = useRouter()

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-64 h-64 mb-6 flex items-center justify-center">
          <Image
            src={image}
            alt="Nenhum professor cadastrado"
            className="w-full h-full object-contain"
          />
        </div>

        <h3 className="mb-2 text-center">{title}</h3>

        <p className="text-muted-foreground text-center mb-6 max-w-sm">
          {description}
        </p>

        <Button onClick={() => router.push('/professores/novo')}>
          <Plus className="h-4 w-4" />
          {footerText}
        </Button>
      </CardContent>
    </Card>
  )
}
