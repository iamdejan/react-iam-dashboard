import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import Role from "../types/Role";
import { assignEmployeeToRole, createRole } from "./functions";

export function useCreateRole(): UseMutationResult<unknown, Error, Role> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (role: Role) => await createRole(role),
    onError: (error) => {
      console.error("error on role creation", error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    }
  });
}

export function useAssignEmployeeToRole(roleID: string): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (employeeID: string) => await assignEmployeeToRole(roleID, employeeID),
    onError: (error) => {
      console.error("error on assigning employee to role", error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["roles", roleID],
      });
      await queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    }
  });
}
