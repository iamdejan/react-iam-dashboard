import { describe, expect, it, vi } from "vitest";
import { render } from "../../../test-utils/render";
import { waitFor } from "@testing-library/react";
import RoleDetail from "../RoleDetail";

const mocks = vi.hoisted(() => ({
  route: vi.fn().mockReturnValue({
    useParams: () => ({ id: "01JCQCY1GMX6FF7EGG9N30DM81" }),
  }),
  useRole: vi.fn().mockReturnValue({
    data: {
      id: "01JCQCY1GMX6FF7EGG9N30DM81",
      team: "team",
      toString: () => "role",
      employees: ["employeeID"],
    },
    error: null,
    isLoading: false,
    isPending: false,
    isSuccess: true,
  }),
  useAssignEmployeeToRole: vi.fn().mockReturnValue({
    mutate: vi.fn(),
  }),
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

    const { getByText } = render(
      <RoleDetail />
    );

    const fooElement = await waitFor(() => getByText("Role 01JCQCY1GMX6FF7EGG9N30DM81"), { timeout: 2000 });
    console.log(fooElement);
    expect(fooElement).toBeDefined();
  });
});
