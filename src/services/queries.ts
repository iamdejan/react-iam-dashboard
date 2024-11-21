import { UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query";
import Role from "../types/Role";
import { getPermission, getPermissions, getRole, getRoles, getRolesByTeam } from "./functions";
import Permission from "../types/Permission";
import Team from "../types/Team";

export function useRoles(): UseQueryResult<Role[]> {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
}

export function useRolesByTeam(team?: Team|null): UseQueryResult<Role[]> {
  return useQuery({
    queryKey: ["roles", "team", team],
    enabled: team !== undefined && team !== null,
    queryFn: async () => await getRolesByTeam(team),
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

export function usePermissions(): UseQueryResult<Permission[]> {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
  });
}

export function usePermission(id: string): UseQueryResult<Permission> {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["permissions", id],
    queryFn: async () => await getPermission(id),
    initialData: (): Permission | undefined => {
      return queryClient.getQueryData<Permission[] | undefined>(["permissions"])?.find((permission) => permission.id === id);
    },
  });
}
