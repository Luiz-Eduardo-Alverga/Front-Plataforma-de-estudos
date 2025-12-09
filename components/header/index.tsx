'use client'

import { LogOut, Menu } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { HouseLineIcon } from '@phosphor-icons/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean)

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')

    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())

    const isLast = index === segments.length - 1
    const isSecondToLast = index === segments.length - 2

    return { href, label, isLast, isSecondToLast }
  })

  return (
    <header className="bg-card border-b shadow border-border sticky top-0 z-10">
      <div className="px-4 sm:px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            className="hover:cursor-pointer bg-yellowButton hover:bg-yellowButton/90 text-black"
            size="icon"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Breadcrumb className="sr-only sm:not-sr-only">
            <BreadcrumbList>
              <BreadcrumbItem>
                {segments.length === 0 ? (
                  <BreadcrumbPage>
                    <span className="flex items-center gap-1 ">
                      <HouseLineIcon weight="fill" className="h-4 w-4 " />
                      <span>Início</span>
                    </span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-1 "
                    >
                      <HouseLineIcon weight="fill" className="h-4 w-4 " />
                      <span>Início</span>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {crumbs.map((crumb) => (
                <Fragment key={crumb.href}>
                  <BreadcrumbSeparator />

                  <BreadcrumbItem>
                    {crumb.isLast || crumb.isSecondToLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
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
