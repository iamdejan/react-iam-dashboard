import { useQuery, UseQueryResult } from "@tanstack/react-query";
import Role from "../types/Role";
import { getRoles } from "./functions";

export function useRoles(): UseQueryResult<Role[]> {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
}
