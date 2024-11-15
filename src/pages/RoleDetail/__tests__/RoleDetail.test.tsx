import { describe, expect, it, vi } from "vitest";
import { render } from "../../../test-utils/render";
import { waitFor } from "@testing-library/react";
import RoleDetail from "../RoleDetail";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import Role from "../../../types/Role";
import Team from "../../../types/Team";

const mocks = vi.hoisted(() => ({
  route: vi.fn().mockReturnValue({
    useParams: () => ({ id: "01JCQCY1GMX6FF7EGG9N30DM81" }),
  }),
  useRole: vi.fn((id: string): UseQueryResult<Role> => ({
    data: new Role(id, Team.INFRA, "test"),
    error: null,
    isError: false,
    isLoadingError: false,
    isLoading: false,
    isPending: false,
    isSuccess: true,
  } as UseQueryResult<Role>)),
  useAssignEmployeeToRole: vi.fn((): UseMutationResult<void, Error, string> => ({
    isPending: false,
    isError: false,
    isIdle: true,
  } as UseMutationResult<void, Error, string>)),
}));

describe("RoleDetail", () => {
  it("should render title", async () => {
    vi.mock("@tanstack/react-router", () => ({
      getRouteApi: mocks.route,
    }));

    vi.mock(import("../../../services/queries"), () => ({
      useRole: mocks.useRole,
    }));

    vi.mock(import("../../../services/mutations"), () => ({
      useAssignEmployeeToRole: mocks.useAssignEmployeeToRole,
    }));

    const { getByText } = render(<RoleDetail />);

    const title = await waitFor(() => getByText("Role 01JCQCY1GMX6FF7EGG9N30DM81"), { timeout: 2000 });
    expect(title).not.toBeNull();
    expect(title).not.toBeUndefined();
  });
});
