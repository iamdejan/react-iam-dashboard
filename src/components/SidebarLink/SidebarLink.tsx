import { ForwardedRef, forwardRef } from "react";
import { Link, createLink } from "@tanstack/react-router";
import { NavLink, NavLinkProps } from "@mantine/core";

const SidebarLink = createLink(forwardRef((props: NavLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  return (
    <NavLink
      {...props}
      variant="subtle"
      ref={ref}
      component={Link}
    />
  );
}));

export default SidebarLink;
