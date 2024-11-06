import { z } from "zod";

export const CreateRoleSchema = z.object({
  team: z.string().min(1),
  role: z.string().min(1),
});

export type CreateRole = z.infer<typeof CreateRoleSchema>;
