import { Team } from "./teams";

export class Role {
  public readonly id: string;
  public readonly team: Team;
  public readonly position: string;

  public employees: string[] = [];

  constructor(id: string, team: Team, position: string) {
    this.id = id;
    this.team = team;
    this.position = position.toLowerCase();
  }

  public assignEmployee(employeeID: string): void {
    this.employees.push(employeeID);
  }

  public toString(): string {
    return `${this.team.toLowerCase()}.${this.position.toLowerCase()}`;
  }
};

export const rolesData: Role[] = [
  new Role("01JBX336MTNS2YTFE76CH8AB7R", Team.INFRA, "manager"),
  new Role("01JBX336MTNS2YTFE76CH8AB7S", Team.LEASING, "field-staff"),
  new Role("01JBX336MTNS2YTFE76CH8AB7S", Team.LEASING, "business-analyst"),
  new Role("01JBX336MTNS2YTFE76CH8AB7T", Team.LEASING, "supervisor"),
  new Role("01JBX336MTNS2YTFE76CH8AB7T", Team.TICKETING, "desk-staff"),
  new Role("01JBX336MTNS2YTFE76CH8AB7T", Team.TICKETING, "business-analyst"),
  new Role("01JBX336MTNS2YTFE76CH8AB7T", Team.TICKETING, "supervisor"),
];
