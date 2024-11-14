import Role from "./Role";
import Team from "./Team";

export default class Permission {
  public readonly id: string;
  public readonly team: Team;
  public readonly entity: string;
  public readonly action: string;
  public roles: Role[];

  constructor(id: string, team: Team, entity: string, action: string) {
    this.id = id;
    this.team = team;
    this.entity = entity.toLowerCase();
    this.action = action.toLowerCase();
    this.roles = [];
  }

  public toString(): string {
    return `${this.team.toString().toLowerCase()}.${this.entity.toLowerCase()}.${this.action.toLowerCase()}`;
  }

  public assignRole(role: Role): void {
    this.roles = [...this.roles, role];
  }
};
