import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import Role from "../types/Role";
import { createRole } from "./functions";

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
