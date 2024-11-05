import { rolesData } from "../data/roles";
import Role from "../types/Role";

const delayMS = 1000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getRoles(): Promise<Role[]> {
  const rolesDataPromise = Promise.resolve(rolesData);
  const sleepPromise = delay(delayMS);
  await Promise.allSettled([rolesDataPromise, sleepPromise]);
  return rolesDataPromise;
}
