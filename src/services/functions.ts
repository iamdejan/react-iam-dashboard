import typia from "typia";
import Permission from "../types/Permission";
import Role from "../types/Role";
import Team from "../types/Team";

const delayMS = 1000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRolesFromLocalStorage(): Role[] {
  const data = localStorage.getItem("roles");
  if (data === null) {
    return [];
  }

  const roles: Role[] = [];
  const parsedData = typia.json.assertParse<Role[]>(data);
  for (const d of parsedData) {
    if (typia.is<Role>(d)) {
      roles.push(Role.fromTypiaPrimitive(d));
    }
  }
  return roles;
}

export async function createRole(role: Role): Promise<void> {
  let roles = getRolesFromLocalStorage();
  roles = [...roles, role];
  localStorage.setItem("roles", JSON.stringify(roles));
  await delay(delayMS);
}

export async function getRoles(): Promise<Role[]> {
  const rolesDataPromise = Promise.resolve(getRolesFromLocalStorage());
  const sleepPromise = delay(delayMS);
  await Promise.allSettled([rolesDataPromise, sleepPromise]);
  return rolesDataPromise;
}

export async function getRolesByTeam(team?: Team): Promise<Role[]> {
  const roles = getRolesFromLocalStorage();
  const rolesDataPromise = Promise.resolve(roles.filter((role) => Boolean(team) && role.team === team));
  const sleepPromise = delay(delayMS);
  await Promise.allSettled([rolesDataPromise, sleepPromise]);
  return rolesDataPromise;
}

export async function getRole(id: string): Promise<Role | undefined> {
  const roles = getRolesFromLocalStorage();
  const roleDataPromise = Promise.resolve(roles.find((role) => role.id === id));
  const sleepPromise = delay(delayMS);
  await Promise.allSettled([roleDataPromise, sleepPromise]);
  return roleDataPromise;
}

export async function assignEmployeeToRole(roleID: string, employeeID: string): Promise<void> {
  const roles = getRolesFromLocalStorage();
  const index = roles.findIndex((role) => role.id === roleID);
  const role = roles[index];
  role.assignEmployee(employeeID);
  roles[index] = role;
  localStorage.setItem("roles", typia.json.assertStringify(roles));
  await delay(delayMS);
}

function getPermissionsFromLocalStorage(): Permission[] {
  const data = localStorage.getItem("permissions");
  if (data === null) {
    return [];
  }

  const permissions: Permission[] = [];
  const parsedData = typia.json.assertParse<Permission[]>(data);
  for (const d of parsedData) {
    if (typia.is<Permission>(d)) {
      permissions.push(Permission.fromTypiaPrimitive(d));
    }
  }
  return permissions;
}

export async function createPermission(permission: Permission): Promise<void> {
  let permissions = getPermissionsFromLocalStorage();
  permissions = [...permissions, permission];
  localStorage.setItem("permissions", typia.json.assertStringify(permissions));
  await delay(delayMS);
}

export async function getPermissions(): Promise<Permission[]> {
  const permissions = getPermissionsFromLocalStorage();
  const permissionsDataPromise = Promise.resolve(permissions);
  const sleepPromise = delay(delayMS);
  await Promise.allSettled([permissionsDataPromise, sleepPromise]);
  return permissionsDataPromise;
}

export async function getPermission(id: string): Promise<Permission | undefined> {
  const permissions = getPermissionsFromLocalStorage();
  const permissionDataPromise = Promise.resolve(permissions.find((permission) => permission.id === id));
  const sleepPromise = delay(delayMS);
  await Promise.allSettled([permissionDataPromise, sleepPromise]);
  return permissionDataPromise;
}

export async function assignRoleToPermission(permissionID: string, role: Role): Promise<void> {
  const permissions = getPermissionsFromLocalStorage();
  const index = permissions.findIndex((p) => p.id === permissionID);
  const foundPermission = permissions[index];
  foundPermission.assignRole(role);
  localStorage.setItem("permissions", typia.json.assertStringify(permissions));
  await delay(delayMS);
}
