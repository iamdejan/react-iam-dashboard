import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRoles } from "../queries";
import { QueryClient } from "@tanstack/react-query";
import { renderWithQueryClient } from "../../test-utils/render";

const queryClient = new QueryClient();

describe("useRoles", () => {
  it("should return a list of roles", async () => {
    const { result } = renderHook(() => useRoles(), {
      wrapper: renderWithQueryClient(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 2000, interval: 200 });
    expect(result.current.data).not.toBeNull();
    expect(result.current.data).not.toBeUndefined();
    console.log(result.current.data);
  });
});
