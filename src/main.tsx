import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "@mantine/core/styles.css";
import { createTheme, MantineColorsTuple, MantineProvider } from "@mantine/core";

const router = createRouter({
  routeTree,
  defaultPreload: "intent"
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const tosca: MantineColorsTuple = [
  "#e5fcf8",
  "#d8f3ee",
  "#b6e3dc",
  "#90d4c8",
  "#70c6b7",
  "#5cbeac",
  "#4ebaa7",
  "#3da392",
  "#2f9281",
  "#177f6f"
];
const theme = createTheme({
  colors: {
    tosca,
  }
});

const rootElement = document.getElementById("root");
if(rootElement !== null && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </StrictMode>
  );
}
