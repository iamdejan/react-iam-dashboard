import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import { MantineProvider } from "@mantine/core";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({
  routeTree
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();

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
