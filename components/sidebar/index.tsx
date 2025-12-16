import { LayoutDashboard, BookOpen, Video, Users, FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

const menuItems = [
  {
    id: 'professores',
    label: 'Professores',
    icon: Users,
    href: '/professores',
  },
  { id: 'materias', label: 'Matérias', icon: BookOpen, href: '/materias' },
  { id: 'aulas', label: 'Aulas', icon: Video, href: '/aulas' },
  { id: 'provas', label: 'Provas', icon: FileText, href: '/provas' },
]

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  const isDashboardActive = pathname.startsWith('/dashboard')

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
          <div className="p-3 border-b border-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Image src="/logosoftcom.svg" width={155} height={155} alt="" />
            </div>
          </div>

          <nav className="flex-1 py-6 px-4 space-y-1">
            <Link
              href="/dashboard"
              className={`w-full font-semibold hover:text-black flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isDashboardActive
                  ? ' text-black bg-muted'
                  : 'text-white hover:bg-muted'
              }`}
            >
              <LayoutDashboard className="h-4 w-4 shrink-0 ml-2" />
              <span>Dashboard</span>
            </Link>

            <h3 className="text-muted-foreground text-xs font-bold px-3 pt-3">
              CADASTROS
            </h3>

            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)

              return (
                <Link
                  href={item.href}
                  key={item.id}
                  className={`w-full font-semibold hover:text-black flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? ' text-black bg-muted'
                      : 'text-white hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0  ml-2 " />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
