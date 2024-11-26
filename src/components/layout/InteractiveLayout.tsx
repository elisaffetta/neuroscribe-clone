'use client'

import { FC, PropsWithChildren, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import BackToHome from '../ui/BackToHome'

interface InteractiveLayoutProps {
  children: PropsWithChildren
}

const InteractiveLayout: FC<InteractiveLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
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
    </div>
  )
}

export default InteractiveLayout
