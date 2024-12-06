import Permission, { permissionConverter } from "../types/Permission";
import Role, { roleConverter } from "../types/Role";
import Team from "../types/Team";
import { db } from "../firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

export async function createRole(role: Role): Promise<void> {
  const d = doc(db, "roles", role.id).withConverter(roleConverter);
  await setDoc(d, role);
}

export async function getRoles(): Promise<Role[]> {
  try {
    const q = query(collection(db, "roles").withConverter(roleConverter));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

export async function getRolesByTeam(team?: Team | null): Promise<Role[]> {
  try {
    const q = query(collection(db, "roles").withConverter(roleConverter), where("team", "==", team));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

export async function getRole(id: string): Promise<Role | undefined> {
  try {
    const q = query(collection(db, "roles").withConverter(roleConverter), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const roles = querySnapshot.docs.map((doc) => doc.data());
    if (roles.length === 0) {
      throw new Error("Role not found");
    }

    return roles[0];
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

export async function assignEmployeeToRole(roleID: string, employeeID: string): Promise<void> {
  const role = await getRole(roleID);
  if (role === undefined) {
    throw new Error("Role not found");
  }
  role.assignEmployee(employeeID);

  const d = doc(db, "roles", roleID).withConverter(roleConverter);
  await setDoc(d, role);
}

export async function createPermission(permission: Permission): Promise<void> {
  const d = doc(db, "permissions", permission.id).withConverter(permissionConverter);
  await setDoc(d, permission);
}

export async function getPermissions(): Promise<Permission[]> {
  try {
    const q = query(collection(db, "permissions").withConverter(permissionConverter));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

export async function getPermission(id: string): Promise<Permission | undefined> {
  try {
    const q = query(collection(db, "permissions").withConverter(permissionConverter), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const permissions = querySnapshot.docs.map((doc) => doc.data());
    if (permissions.length === 0) {
      throw new Error("Permission not found");
    }

    return permissions[0];
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

export async function assignRoleToPermission(permissionID: string, role: Role): Promise<void> {
  const permission = await getPermission(permissionID);
  if (permission === undefined) {
    throw new Error("Permission not found");
  }
  permission.assignRole(role);

  const d = doc(db, "permissions", permissionID).withConverter(permissionConverter);
  await setDoc(d, permission);
}
