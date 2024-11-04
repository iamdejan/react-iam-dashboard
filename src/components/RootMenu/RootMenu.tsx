import { AppShell, Title } from "@mantine/core";
import { FileRoutesByPath, Link, Outlet } from "@tanstack/react-router";
import { JSX, lazy } from "react";
import SidebarLink from "../SidebarLink";

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
          <Title>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              React IAM Dashboard
            </Link>
          </Title>
        </AppShell.Header>
        <AppShell.Navbar>
          {routeList.map((route) => (
            <SidebarLink
              key={route.link}
              label={route.title}
              to={route.link}
            />
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
