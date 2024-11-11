import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRole, useRoles } from "../queries";
import { QueryClient } from "@tanstack/react-query";
import { renderWithQueryClient } from "../../test-utils/render";
import Team from "../../types/Team";

const queryClient = new QueryClient();

describe("useRoles", () => {
  it("should return a list of roles", async () => {
    const { result } = renderHook(() => useRoles(), {
      wrapper: renderWithQueryClient(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 2000, interval: 200 });
    expect(result.current.data).not.toBeNull();
    expect(result.current.data).not.toBeUndefined();
  });
});

describe("useRole", () => {
  const id = "01JCCQ8GYJ1RF51MW6QFYA6HSN";

  it("should return a role", async () => {
    const { result } = renderHook(() => useRole(id), {
      wrapper: renderWithQueryClient(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 2000, interval: 200 });
    expect(result.current.data).not.toBeNull();
    expect(result.current.data).not.toBeUndefined();

    if (result.current.data) {
      const data = result.current.data;
      expect(data.id).toBe("01JCCQ8GYJ1RF51MW6QFYA6HSN");
      expect(data.team).toBe(Team.LEASING);
      expect(data.position).toBe("supervisor");
    }
  });
});
