import { Primitive } from "typia";
import Team from "./Team";

export default class Role {
  public readonly id: string;
  public readonly team: Team;
  public readonly position: string;

  public employees: string[] = [];

  constructor(id: string, team: Team, position: string) {
    this.id = id;
    this.team = team;
    this.position = position.toLowerCase();
  }

  public static fromTypiaPrimitive(other: Primitive<Role>): Role {
    const role = new Role(other.id, other.team, other.position);
    role.employees = other.employees;
    return role;
  }

  public assignEmployee(employeeID: string): void {
    this.employees.push(employeeID);
  }

  public toString(): string {
    return `${this.team.toLowerCase()}.${this.position.toLowerCase()}`;
  }
};
