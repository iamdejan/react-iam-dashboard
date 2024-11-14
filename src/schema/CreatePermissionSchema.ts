import { z } from "zod";

export const CreatePermissionSchema = z.object({
  team: z.string().min(1),
  entity: z.string().min(1),
  action: z.string().min(1),
});

export type CreatePermission = z.infer<typeof CreatePermissionSchema>;
