import { createLazyFileRoute } from "@tanstack/react-router";
import RoleDetail from "../../pages/RoleDetail";

export const Route = createLazyFileRoute("/roles/$id")({
  component: RoleDetail,
});
