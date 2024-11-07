import Role from "./Role";
import Team from "./Team";

export default class Permission {
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
