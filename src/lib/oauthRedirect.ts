export const OAUTH_NEXT_PARAM = 'next';

export function getOAuthRedirectTo(nextPath?: string): string {
  if (typeof window === 'undefined') {
    return '/auth/callback';
  }

  const currentPath =
    nextPath ??
    `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const callbackUrl = new URL('/auth/callback', window.location.origin);
  callbackUrl.searchParams.set(OAUTH_NEXT_PARAM, currentPath || '/dashboard');
  return callbackUrl.toString();
}

export function getSafeNextPath(rawValue: string | null): string {
  if (!rawValue) return '/dashboard';

  // Prevent open redirect by only allowing same-origin relative paths.
  if (!rawValue.startsWith('/')) return '/dashboard';
  if (rawValue.startsWith('//')) return '/dashboard';

  return rawValue;
}
