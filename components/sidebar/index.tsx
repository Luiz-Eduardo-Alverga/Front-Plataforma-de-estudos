import {
  LayoutDashboard,
  BookOpen,
  Video,
  Users,
  FileText,
  GraduationCap,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

const menuItems = [
  { id: 'materias', label: 'Matérias', icon: BookOpen, href: '/materias' },
  { id: 'aulas', label: 'Aulas', icon: Video, href: '/aulas' },
  {
    id: 'professores',
    label: 'Professores',
    icon: Users,
    href: '/professores',
  },
  { id: 'provas', label: 'Provas', icon: FileText, href: '/provas' },
]

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`bg-primary border-r border-border h-screen sticky top-0 transition-all duration-300 w-64
          ${mobileOpen ? 'fixed inset-y-0 left-0 z-50 lg:sticky' : 'hidden'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-white">Proacad</span>
            </div>
          </div>

          <nav className="flex-1 py-2 space-y-1">
            <Link
              href={'/dashboard'}
              className={`w-full  flex items-center gap-3 px-3 py-2  transition-colors ${'text-muted-foreground hover:bg-muted-foreground hover:text-accent-foreground'}`}
            >
              <LayoutDashboard className="h-5 w-5 shrink-0 text-white ml-2" />
              <span className="text-white ">Dashboard</span>
            </Link>

            <h3 className="text-muted-foreground text-sm font-bold px-3 pt-3">
              CADASTROS
            </h3>

            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)

              return (
                <Link
                  href={item.href}
                  key={item.id}
                  className={`w-full flex items-center gap-3 px-3 py-2  transition-colors ${
                    isActive
                      ? ' text-white bg-muted-foreground'
                      : 'text-muted-foreground hover:bg-muted-foreground hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0 text-white ml-2" />
                  <span className="text-white ">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
