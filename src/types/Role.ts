import { Primitive } from "typia";
import Team from "./Team";
import { PartialWithFieldValue, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

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

export const roleConverter = {
  toFirestore: (role: Role): PartialWithFieldValue<Role> => {
    return {
      id: role.id,
      team: role.team,
      position: role.position,
      employees: role.employees,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<Role, Role>, options?: SnapshotOptions): Role => {
    const data = snapshot.data(options);
    const role = new Role(data.id, data.team, data.position);
    role.employees = data.employees;
    return role;
  }
};
