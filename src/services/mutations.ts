import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import Role from "../types/Role";
import { assignEmployeeToRole, createPermission, createRole } from "./functions";
import Permission from "../types/Permission";

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
    }
  });
}

export function useCreatePermission(): UseMutationResult<unknown, Error, Permission> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (permission: Permission) => await createPermission(permission),
    onError: (error) => {
      console.error("error on permission creation", error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    }
  });
}
