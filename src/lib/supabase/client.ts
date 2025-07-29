import { createClient } from '@supabase/supabase-js';
import Cookies from 'js-cookie';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      flowType: 'pkce',
      storage: {
        getItem: (key) => {
          const value = Cookies.get(key);
          return value ? value : null;
        },
        setItem: (key, value) => {
          Cookies.set(key, value, {
            path: '/',
            httpOnly: false,
            sameSite: 'none',
            domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
            secure: true,
          });
        },
        removeItem: (key) => {
          Cookies.remove(key, {
            path: '/',
            httpOnly: false,
            sameSite: 'none',
            domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
            secure: true,
          });
        },
      },
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
);
