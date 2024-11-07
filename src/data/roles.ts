import Role from "../types/Role";
import Team from "../types/Team";

export const rolesData: Role[] = [
  new Role("01JBX336MTNS2YTFE76CH8AB7R", Team.INFRA, "manager"),
  new Role("01JBX336MTNS2YTFE76CH8AB7S", Team.LEASING, "field-staff"),
  new Role("01JBX336MTNS2YTFE76CH8AB7S", Team.LEASING, "business-analyst"),
  new Role("01JBX336MTNS2YTFE76CH8AB7T", Team.LEASING, "supervisor"),
  new Role("01JBX336MTNS2YTFE76CH8AB7T", Team.TICKETING, "desk-staff"),
  new Role("01JBX336MTNS2YTFE76CH8AB7T", Team.TICKETING, "business-analyst"),
  new Role("01JBX336MTNS2YTFE76CH8AB7T", Team.TICKETING, "supervisor"),
];
