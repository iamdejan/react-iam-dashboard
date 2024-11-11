import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Role from "../types/Role";
import { getRole, getRoles } from "./functions";

export function useRoles(): UseQueryResult<Role[]> {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
}

export function useRole(id: string): UseQueryResult<Role> {
  return useQuery({
    queryKey: ["roles", id],
    queryFn: async () => await getRole(id),
  });
}
