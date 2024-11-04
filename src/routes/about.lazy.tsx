import { JSX } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About(): JSX.Element {
  return <div>Hello from About!</div>;
}
