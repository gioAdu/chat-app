import { NextResponse } from 'next/server'

export default async function middleware(req) {
  const isAuthenticated = true

  if (req.nextUrl.pathname === '/' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  if (req.nextUrl.pathname.includes('/auth') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}