import { App } from "~/spa/App";
import type { Route } from "./+types/home";

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hermes" },
    {
      name: "description",
      content:
        "Simple to use. Really fast. Hermes is your chat room application.",
    },
  ];
}

export default function Home() {
  return <App />;
}
