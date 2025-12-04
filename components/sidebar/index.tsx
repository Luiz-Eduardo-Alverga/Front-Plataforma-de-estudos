import { 
    LayoutDashboard, 
    BookOpen, 
    Video, 
    Users, 
    FileText, 
    GraduationCap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'materias', label: 'Matérias', icon: BookOpen, href: '/materias' },
  { id: 'aulas', label: 'Aulas', icon: Video, href: '/aulas' },
  { id: 'professores', label: 'Professores', icon: Users, href: '/professores' },
  { id: 'provas', label: 'Provas', icon: FileText, href: '/provas' }
];


export function Sidebar({  mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside 
        className={`bg-card border-r border-border h-screen sticky top-0 transition-all duration-300 w-64
          ${mobileOpen ? 'fixed inset-y-0 left-0 z-50 lg:sticky' : 'hidden'}
        `}
      >
        <div className="flex flex-col h-full">
          
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">EduPlataforma</span>
            </div>
          </div>

          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href; 
              
              return (
                <Link
                  href={item.href}
                  key={item.id}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="space-y-2">
              <p className="text-muted-foreground">Usuário Admin</p>
              <p className="text-muted-foreground">admin@escola.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}