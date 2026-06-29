function isLocalhost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

export function getUserDashboardUrl(): string {
  const env = process.env.NEXT_PUBLIC_USER_DASHBOARD_URL;
  if (env) return env;
  if (typeof window !== 'undefined' && isLocalhost(window.location.hostname)) {
    return 'http://localhost:3002';
  }
  return 'https://user-dashboard-steel-alpha.vercel.app';
}

export function getFounderDashboardUrl(): string {
  const env = process.env.NEXT_PUBLIC_FOUNDER_DASHBOARD_URL;
  if (env) return env;
  if (typeof window !== 'undefined' && isLocalhost(window.location.hostname)) {
    return 'http://localhost:3001';
  }
  return 'https://founder-dashboard-rosy.vercel.app';
}
