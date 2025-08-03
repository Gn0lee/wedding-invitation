import { createClient } from '@/lib/supabase/server';

export async function checkAdminPermission(): Promise<{ isAdmin: boolean; userId?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { isAdmin: false };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return { isAdmin: false };
  }

  return {
    isAdmin: profile.role === 'admin',
    userId: user.id,
  };
}

export async function requireAdminPermission(): Promise<{ userId: string }> {
  const { isAdmin, userId } = await checkAdminPermission();

  if (!isAdmin || !userId) {
    throw new Error('Admin permission required');
  }

  return { userId };
}
