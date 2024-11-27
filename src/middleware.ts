import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Получаем текущий ответ
  const response = NextResponse.next()

  // Устанавливаем заголовки безопасности
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  return response
}

// Указываем, для каких путей применять middleware
export const config = {
  matcher: '/:path*',
}
