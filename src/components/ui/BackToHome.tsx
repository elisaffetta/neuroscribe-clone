'use client'

import { FC } from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'

const BackToHome: FC = () => {
  return (
    <Link
      href="/"
      className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 group"
    >
      <Home className="w-5 h-5" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out">
        На главную
      </span>
    </Link>
  )
}

export default BackToHome
