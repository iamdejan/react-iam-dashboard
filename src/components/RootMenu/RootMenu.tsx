import { AppShell, NavLink, Title } from "@mantine/core";
import { FileRoutesByPath, Outlet } from "@tanstack/react-router";
import { JSX, lazy } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? (): null => null // Render nothing in production
    : lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

type RouteLink = {
  link: keyof FileRoutesByPath,
  title: string
};

const routeList: RouteLink[] = [
  {
    link: "/",
    title: "Home"
  },
  {
    link: "/role-management",
    title: "Role Management"
  },
  {
    link: "/permission-management",
    title: "Permission Management"
  }
];

export default function RootMenu(): JSX.Element {
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 200, breakpoint: "sm" }}
        padding="md"
      >
        <AppShell.Header style={{
          padding: "0.5rem"
        }}>
          <Title>React IAM Dashboard</Title>
        </AppShell.Header>
        <AppShell.Navbar>
          {routeList.map((route) => (
            <NavLink key={route.link} label={route.title} href={route.link} />
          ))}
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <TanStackRouterDevtools />
    </>
  );
}
