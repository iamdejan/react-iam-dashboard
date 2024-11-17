import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import { MantineProvider } from "@mantine/core";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rolesData } from "./data/roles";
import { permissionsData } from "./data/permissions";
import typia from "typia";
import Role from "./types/Role";
import Permission from "./types/Permission";

const router = createRouter({
  routeTree,
  defaultPreload: "intent"
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();

localStorage.setItem("roles", typia.json.assertStringify<Role[]>(rolesData));
localStorage.setItem("permissions", typia.json.assertStringify<Permission[]>(permissionsData));

const rootElement = document.getElementById("root");
if (rootElement !== null && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}
