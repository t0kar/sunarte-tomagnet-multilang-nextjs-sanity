import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  // Skip public files and special paths
  if (
    PUBLIC_FILE.test(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith('/studio') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/static/sanity')
  ) {
    return NextResponse.next()
  }

  // Only redirect the root path
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/hr', request.url))
  }

  // For all other paths, continue without redirection
  return NextResponse.next()
}