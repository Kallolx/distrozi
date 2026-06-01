import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.redirect(new URL('/DISTROZI%20LLC_DISTRIBUTION_AGREEMENT.pdf', request.url));
}
