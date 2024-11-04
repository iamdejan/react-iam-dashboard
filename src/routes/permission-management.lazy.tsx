import { createLazyFileRoute } from "@tanstack/react-router";
import PermissionManagement from "../pages/PermissionManagement";

export const Route = createLazyFileRoute("/permission-management")({
  component: PermissionManagement,
});
