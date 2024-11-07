import Permission from "../types/Permission";
import Team from "../types/Team";

/**
 * permissions is a starting list of permissions that can be assigned to a role.
 */
export const permissionsData: Permission[] = [
  new Permission("01JBX1KKXER41W9M7Z21CT5CDA", Team.LEASING, "transactions", "view-all"),
  new Permission("01JBX1KKXER41W9M7Z21CT5CDB", Team.LEASING, "transactions", "view-own"),
  new Permission("01JBX1KKXER41W9M7Z21CT5CDD", Team.TICKETING, "purchases","view-all"),
  new Permission("01JBX1KKXER41W9M7Z21CT5CDE", Team.TICKETING, "refunds","view-own"),
];
