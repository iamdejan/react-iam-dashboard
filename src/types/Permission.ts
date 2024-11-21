import { Primitive } from "typia";
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

  public static fromTypiaPrimitive(other: Primitive<Permission>): Permission {
    const permission = new Permission(other.id, other.team, other.entity, other.action);
    permission.roles = other.roles.map((role) => Role.fromTypiaPrimitive(role));
    return permission;
  }

  public toString(): string {
    return `${this.team.toString().toLowerCase()}.${this.entity.toLowerCase()}.${this.action.toLowerCase()}`;
  }

  public assignRole(role: Role): void {
    this.roles.push(role);
  }
};
