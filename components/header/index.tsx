import { LogOut, Menu } from 'lucide-react'
import { Button } from '../ui/button'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-card border-b shadow border-border sticky top-0 z-10">
      <div className="px-4 sm:px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            className=" hover:cursor-pointer sm:sr-only"
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
