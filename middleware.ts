// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Misalkan kita menggunakan cookie bernama 'auth-token' untuk memeriksa otentikasi pengguna
  const token = req.cookies.get('token');

  if (!token) {
    // Jika tidak ada token, arahkan pengguna ke halaman login
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Jika ada token, lanjutkan ke halaman yang diminta
  return NextResponse.next();
}

// Tentukan kapan middleware ini harus berjalan
export const config = {
  matcher: ['/admin/:path*', '/dashboardUmkm/:path*', '/dashboardAsosiasi/:path*']
};
