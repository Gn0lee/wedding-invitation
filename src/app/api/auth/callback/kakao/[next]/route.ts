import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request, { params }: { params: Promise<{ next: string }> }) {
  const { searchParams, origin } = new URL(request.url);

  const { next } = await params;
  const decodedNext = decodeURIComponent(next);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${decodedNext}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${decodedNext}`);
      } else {
        return NextResponse.redirect(`${origin}${decodedNext}`);
      }
    } else {
      console.log(error, 'error');
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
