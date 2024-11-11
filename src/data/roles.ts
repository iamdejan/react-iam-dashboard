import Role from "../types/Role";
import Team from "../types/Team";

export const rolesData: Role[] = [
  new Role("01JBX336MTNS2YTFE76CH8AB7R", Team.INFRA, "manager"),
  new Role("01JBX336MTNS2YTFE76CH8AB7S", Team.LEASING, "field-staff"),
  new Role("01JCCQ83YX658MKH23M7RAWJM4", Team.LEASING, "business-analyst"),
  new Role("01JCCQ8GYJ1RF51MW6QFYA6HSN", Team.LEASING, "supervisor"),
  new Role("01JCCQ8GYJ1RF51MW6QFYA6HSP", Team.TICKETING, "desk-staff"),
  new Role("01JCCQ8GYJ1RF51MW6QFYA6HSQ", Team.TICKETING, "business-analyst"),
  new Role("01JCCQ8GYJ1RF51MW6QFYA6HSS", Team.TICKETING, "supervisor"),
];
