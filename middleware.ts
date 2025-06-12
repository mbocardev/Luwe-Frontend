import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  // Protéger uniquement les routes dashboard
  const protectedRoutes = [
    '/admin/dashboard',
    '/owner/dashboard',
    '/tenant/dashboard',
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !user) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('redirectedFrom', pathname); // Pour revenir après login
    return NextResponse.redirect(loginUrl);
  }

  return res;
}
