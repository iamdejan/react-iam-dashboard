import { AppShell, Box, Title, useMantineTheme } from "@mantine/core";
import { FileRoutesByPath, Link, Outlet } from "@tanstack/react-router";
import { JSX, lazy } from "react";
import SidebarLink from "../SidebarLink";
import { IconUsers, IconBriefcase } from "@tabler/icons-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
  title: string,
  icon?: JSX.Element
};

const routeList: RouteLink[] = [
  {
    link: "/role-management",
    title: "Role Management",
    icon: <IconUsers />
  },
  {
    link: "/permission-management",
    title: "Permission Management",
    icon: <IconBriefcase />
  }
];

export default function RootMenu(): JSX.Element {
  const theme = useMantineTheme();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 200, breakpoint: "sm" }}
        padding="md"
      >
        <AppShell.Header
          style={{
            padding: "0.5rem",
            backgroundColor: theme.colors.tosca[6],
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              width: "100%",
              textAlign: "right"
            }}
          >
            <Title
              order={2}
            >
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "normal"
                }}
              >
                React IAM Dashboard
              </Link>
            </Title>
          </Box>
        </AppShell.Header>
        <AppShell.Navbar>
          {routeList.map((route) => (
            <SidebarLink
              key={route.link}
              label={route.title}
              to={route.link}
              {...(route.icon ? { leftSection: route.icon } : {})}
            />
          ))}
        </AppShell.Navbar>
        <AppShell.Main
          style={{
            backgroundColor: theme.colors.tosca[1]
          }}
        >
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}
