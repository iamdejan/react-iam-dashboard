import { NavLink, NavLinkProps } from "@mantine/core";
import { createLink, Link } from "@tanstack/react-router";
import { ForwardedRef, forwardRef } from "react";

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
