import { RenderResult, render as testingLibraryRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import theme from "../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSX, PropsWithChildren } from "react";

export function render(ui: React.ReactNode): RenderResult {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>
        {children}
      </MantineProvider>
    )
  });
}

export function renderWithQueryClient(
  queryClient: QueryClient
): ({children}: PropsWithChildren<object>) => JSX.Element {
  return function wrapper({children}: PropsWithChildren<object>) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}
