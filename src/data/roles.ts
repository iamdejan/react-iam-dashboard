import { Team } from "./teams";

export class Role {
  public readonly id: string;
  public readonly team: Team;

  constructor(id: string, team: Team) {
    this.id = id;
    this.team = team;
  }
};
