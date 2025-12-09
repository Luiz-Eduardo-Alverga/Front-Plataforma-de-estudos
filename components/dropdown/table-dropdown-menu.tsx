import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { AlertDialogTrigger } from '../ui/alert-dialog'
import { useRouter } from 'next/navigation'

interface TableDropdwonMenuProps {
  itemHref: string
  id: string
}

export function TableDropdwonMenu({ id, itemHref }: TableDropdwonMenuProps) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/${itemHref}/${id}/editar`)}
          className="text-emerald-500 focus:text-emerald-500"
        >
          <Edit className="h-4 w-4 mr-2 text-emerald-500" />
          Editar
        </DropdownMenuItem>
        <AlertDialogTrigger asChild>
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash2 className="h-4 w-4 mr-2 text-destructive" />
            Excluir
          </DropdownMenuItem>
        </AlertDialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
