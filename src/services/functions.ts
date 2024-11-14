import { permissionsData } from "../data/permissions";
import { rolesData } from "../data/roles";
import Permission from "../types/Permission";
import Role from "../types/Role";

const delayMS = 1000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// role management
let roles = [...rolesData];

export async function createRole(role: Role): Promise<void> {
  roles = [...roles, role];
  await delay(delayMS);
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

export async function assignEmployeeToRole(roleID: string, employeeID: string): Promise<void> {
  const index = roles.findIndex((role) => role.id === roleID);
  const role = roles[index];
  role.employees = [...role.employees, employeeID];
  roles[index] = role;
  await delay(delayMS);
}

// permission management
let permissions = [...permissionsData];

export async function createPermission(permission: Permission): Promise<void> {
  permissions = [...permissions, permission];
  await delay(delayMS);
}

export async function getPermissions(): Promise<Permission[]> {
  const permissionsDataPromise = Promise.resolve(permissions);
  const sleepPromise = delay(delayMS);
  await Promise.allSettled([permissionsDataPromise, sleepPromise]);
  return permissionsDataPromise;
}

export async function getPermission(id: string): Promise<Permission | undefined> {
  const permissionDataPromise = Promise.resolve(permissions.find((permission) => permission.id === id));
  const sleepPromise = delay(delayMS);
  await Promise.allSettled([permissionDataPromise, sleepPromise]);
  return permissionDataPromise;
}
