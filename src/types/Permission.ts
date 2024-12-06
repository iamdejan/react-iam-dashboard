import Team from "./Team";
import { PartialWithFieldValue, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from "firebase/firestore";

export default class Permission {
  public readonly id: string;
  public readonly team: Team;
  public readonly entity: string;
  public readonly action: string;
  public roles: string[];

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

  public assignRole(roleID: string): void {
    this.roles.push(roleID);
  }
};

export const permissionConverter = {
  toFirestore: (permission: Permission): PartialWithFieldValue<Permission> => {
    return {
      id: permission.id,
      team: permission.team,
      entity: permission.entity,
      action: permission.action,
      roles: permission.roles,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<Permission, WithFieldValue<Permission>>, options?: SnapshotOptions): Permission => {
    const data = snapshot.data(options);
    const permission = new Permission(data.id, data.team, data.entity, data.action);
    permission.roles = data.roles;
    return permission;
  }
};
