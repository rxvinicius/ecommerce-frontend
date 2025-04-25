export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const exp = decoded.exp;
    const now = Date.now() / 1000;
    return exp < now;
  } catch {
    return true;
  }
}
