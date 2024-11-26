'use client'

import { FC, ReactNode, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import BackToHome from '../ui/BackToHome'
import { useApp } from '@/context/AppContext'

interface InteractiveLayoutProps {
  children: ReactNode
  floatingControls?: ReactNode
}

const InteractiveLayout: FC<InteractiveLayoutProps> = ({ children, floatingControls }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useApp()

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
      <BackToHome />
      {floatingControls && (
        <div className="fixed bottom-4 right-4">
          {floatingControls}
        </div>
      )}
    </div>
  )
}

export default InteractiveLayout
