import type { AuthProvider } from "@refinedev/core";

/**
 * В /admin доступ проверяет AdminGate. Refine не должен делать check() и редирект
 * на /login при гонке refresh между вкладками.
 */
export const adminAuthProvider: AuthProvider = {
  login: async () => ({ success: true }),
  logout: async () => ({ success: true }),
  check: async () => ({ authenticated: true }),
  getPermissions: async () => null,
  getIdentity: async () => null,
  onError: async () => ({ error: undefined }),
};
