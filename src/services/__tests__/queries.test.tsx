import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it } from "vitest";
import { usePermission, usePermissions, useRole, useRoles, useRolesByTeam } from "../queries";
import { QueryClient } from "@tanstack/react-query";
import { renderWithQueryClient } from "../../test-utils/render";
import Team from "../../types/Team";
import typia from "typia";
import { rolesData } from "../../data/roles";
import { permissionsData } from "../../data/permissions";

const queryClient = new QueryClient();

describe("useRoles", () => {
  beforeEach(() => {
    localStorage.setItem("roles", typia.json.assertStringify(rolesData));
    queryClient.clear();
  });

  afterEach(() => {
    localStorage.clear();
    queryClient.clear();
  });

  it("should return a list of roles", async () => {
    const { result } = renderHook(() => useRoles(), {
      wrapper: renderWithQueryClient(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 2000, interval: 200 });
    expect(result.current.data).not.toBeNull();
    expect(result.current.data).not.toBeUndefined();
    expect(result.current.data?.length).toBeGreaterThanOrEqual(1);
  });
});

describe("useRole", () => {
  beforeEach(() => {
    localStorage.setItem("roles", typia.json.assertStringify(rolesData));
    queryClient.clear();
  });

  afterEach(() => {
    localStorage.clear();
    queryClient.clear();
  });

  const id = "01JCCQ8GYJ1RF51MW6QFYA6HSN";

  it("should return a role", async () => {
    const { result } = renderHook(() => useRole(id), {
      wrapper: renderWithQueryClient(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 2000, interval: 200 });
    const data = result.current.data;
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();

    expect(data?.id).toBe("01JCCQ8GYJ1RF51MW6QFYA6HSN");
    expect(data?.team).toBe(Team.LEASING);
    expect(data?.position).toBe("supervisor");
  });
});

describe("useRolesByTeam", () => {
  beforeEach(() => {
    localStorage.setItem("roles", typia.json.assertStringify(rolesData));
    queryClient.clear();
  });

  afterEach(() => {
    localStorage.clear();
    queryClient.clear();
  });

  const team = Team.INFRA;

  it("should return a list of roles", async () => {
    const { result } = renderHook(() => useRolesByTeam(team), {
      wrapper: renderWithQueryClient(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 2000, interval: 200 });
    expect(result.current.data).not.toBeNull();
    expect(result.current.data).not.toBeUndefined();

    const roles = result.current.data ?? [];
    expect(roles.length).toBeGreaterThanOrEqual(1);
    for (const role of roles) {
      expect(role.team).toBe(Team.INFRA);
    }
  });
});

describe("usePermissions", () => {
  beforeEach(() => {
    localStorage.setItem("permissions", typia.json.assertStringify(permissionsData));
    queryClient.clear();
  });

  afterEach(() => {
    localStorage.clear();
    queryClient.clear();
  });

  it("should return a list of permissions", async () => {
    const { result } = renderHook(() => usePermissions(), {
      wrapper: renderWithQueryClient(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 2000, interval: 200 });
    expect(result.current.data).not.toBeNull();
    expect(result.current.data).not.toBeUndefined();

    const permissions = result.current.data ?? [];
    for (const permission of permissions) {
      expect(permission).not.toBeNull();
      expect(permission).not.toBeUndefined();
    }
  });
});

describe("usePermission", () => {
  beforeEach(() => {
    localStorage.setItem("permissions", typia.json.assertStringify(permissionsData));
    queryClient.clear();
  });

  afterEach(() => {
    localStorage.clear();
    queryClient.clear();
  });

  const id = "01JBX1KKXER41W9M7Z21CT5CDA";

  it("should return a permisison", async () => {
    const { result } = renderHook(() => usePermission(id), {
      wrapper: renderWithQueryClient(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 2000, interval: 200 });
    const data = result.current.data;
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();

    expect(data?.id).toBe("01JBX1KKXER41W9M7Z21CT5CDA");
    expect(data?.team).toBe(Team.LEASING);
    expect(data?.entity).toBe("transactions");
    expect(data?.action).toBe("view-all");
  });
});
