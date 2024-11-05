import { Role } from "./roles";
import { Team } from "./teams";

class Permission {
  public readonly id: string;
  public readonly team: Team;
  public readonly entity: string;
  public readonly action: string;
  public readonly role?: Role;

  constructor(id: string, team: Team, entity: string, action: string, role?: Role) {
    this.id = id;
    this.team = team;
    this.entity = entity.toLowerCase();
    this.action = action.toLowerCase();
    this.role = role;
  }

  public toString(): string {
    return `${this.team.toString().toLowerCase()}.${this.entity.toLowerCase()}.${this.action.toLowerCase()}`;
  }
};

/**
 * permissions is a starting list of permissions that can be assigned to a role.
 */
export const permissionsData: Permission[] = [
  new Permission("01JBX1KKXER41W9M7Z21CT5CDA", Team.LEASING, "transactions", "view-all"),
  new Permission("01JBX1KKXER41W9M7Z21CT5CDB", Team.LEASING, "transactions", "view-own"),
  new Permission("01JBX1KKXER41W9M7Z21CT5CDD", Team.TICKETING, "purchases","view-all"),
  new Permission("01JBX1KKXER41W9M7Z21CT5CDE", Team.TICKETING, "refunds","view-own"),
];
