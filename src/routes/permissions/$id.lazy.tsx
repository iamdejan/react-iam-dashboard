import { createLazyFileRoute } from "@tanstack/react-router";
import PermissionDetail from "../../pages/PermissionDetail";

export const Route = createLazyFileRoute("/permissions/$id")({
  component: PermissionDetail,
});
