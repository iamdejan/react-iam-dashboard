import { createLazyFileRoute } from "@tanstack/react-router";
import RoleManagement from "../pages/RoleManagement";

export const Route = createLazyFileRoute("/role-management")({
  component: RoleManagement,
});
