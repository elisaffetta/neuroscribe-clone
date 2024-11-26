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
  ChevronLeft
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const sidebarItems = [
  { icon: HomeIcon, label: 'My Account', href: '/' },
  { icon: LineChart, label: 'Data Analysis', href: '/data-analysis' },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: BookOpen, label: 'Instructions', href: '/instructions' },
  { icon: BookOpen, label: 'Interactive Book', href: '/interactive-book' },
  { icon: Video, label: 'Video Instructions', href: '/video-instructions' },
  { icon: FileText, label: 'NeuroGate', href: '/neurogate' }
]

const Sidebar: FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      } border-r border-gray-200 dark:border-gray-800 shadow-lg z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Image
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
              alt="Logo"
              width={32}
              height={32}
              className="dark:invert"
            />
            <span className="font-semibold text-gray-800 dark:text-white">Dashboard</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          {collapsed ? (
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      <nav className="mt-4 px-2">
        {sidebarItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={index}
              href={item.href}
              className={`w-full flex items-center ${
                collapsed ? 'justify-center' : 'justify-start'
              } p-3 my-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                isActive ? 'text-indigo-600 dark:text-indigo-400' : ''
              }`} />
              {!collapsed && (
                <span className={`ml-3 font-medium ${
                  isActive ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}>
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
