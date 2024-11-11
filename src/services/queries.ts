import { UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query";
import Role from "../types/Role";
import { getRole, getRoles } from "./functions";

export function useRoles(): UseQueryResult<Role[]> {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
}

export function useRole(id: string): UseQueryResult<Role> {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["roles", id],
    queryFn: async () => await getRole(id),
    initialData: (): Role | undefined => {
      return queryClient.getQueryData<Role[] | undefined>(["roles"])?.find((role) => role.id === id);
    },
  });
}
