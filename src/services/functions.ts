import { rolesData } from "../data/roles";
import Role from "../types/Role";

const delayMS = 1000;

let roles = [...rolesData];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getRoles(): Promise<Role[]> {
  const rolesDataPromise = Promise.resolve(roles);
  const sleepPromise = delay(delayMS);
  await Promise.allSettled([rolesDataPromise, sleepPromise]);
  return rolesDataPromise;
}

export async function getRole(id: string): Promise<Role | undefined> {
  const roleDataPromise = Promise.resolve(roles.find((role) => role.id === id));
  const sleepPromise = delay(delayMS);
  await Promise.allSettled([roleDataPromise, sleepPromise]);
  return roleDataPromise;
}

export async function createRole(role: Role): Promise<void> {
  roles = [...roles, role];
  await delay(delayMS);
}
