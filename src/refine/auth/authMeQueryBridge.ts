import type { QueryClient } from "@tanstack/react-query";
import type { AuthMePayload } from "./authMeCache";

let queryClient: QueryClient | null = null;

export function registerAuthMeQueryClient(client: QueryClient): void {
  queryClient = client;
}

export function getAuthMeQueryClient(): QueryClient | null {
  return queryClient;
}

function permissionsKey(p: string[]): string {
  return p.join("\0");
}

/** Обновляет кэш React Query без refetch — другие вкладки не «перезагружаются». */
export function syncAuthMeToQueries(payload: AuthMePayload): void {
  if (!queryClient) return;
  const prev = queryClient.getQueryData<AuthMePayload>(["auth", "me"]);
  if (
    prev &&
    prev.user.id === payload.user.id &&
    permissionsKey(prev.permissions) === permissionsKey(payload.permissions)
  ) {
    return;
  }
  queryClient.setQueryData<AuthMePayload>(["auth", "me"], payload);
}
