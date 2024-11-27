'use client'

import { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  FileText,
  Home as HomeIcon,
  LineChart,
  Menu,
  Video,
  ChevronLeft,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react'
import { useApp } from '@/context/AppContext'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const Sidebar: FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { t } = useApp()

  useEffect(() => {
    setMounted(true)
  }, [])

  const sidebarItems = [
    { icon: HomeIcon, label: t('common.home'), href: '/' },
    { icon: FileText, label: t('common.templates'), href: '/templates' },
    { icon: MessageSquare, label: t('common.chat'), href: '/chat' },
    { icon: ImageIcon, label: t('common.imageGeneration'), href: '/image-generation' },
    { icon: LineChart, label: t('common.dataAnalysis'), href: '/data-analysis' },
    { icon: FileText, label: t('common.documents'), href: '/documents' },
    { icon: BookOpen, label: t('common.instructions'), href: '/instructions' },
    { icon: BookOpen, label: t('common.book'), href: '/interactive-book' },
    { icon: Video, label: t('common.videoInstructions'), href: '/video-instructions' },
    { icon: FileText, label: t('common.neurogate'), href: '/neurogate' }
  ]

  if (!mounted) return null

  return (
    <nav
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      } z-50`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2" aria-label="Home">
          <Image
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8 dark:invert"
          />
          {!collapsed && (
            <span className="text-xl font-semibold">{t('common.neuroscribe')}</span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="mt-4 px-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Sidebar
