import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { config } from "./components/config";
import useSWR from "swr";
import fetcher from "./components/fetcher";
import type { AuthResponse, AuthStatus } from "./components/utils";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", type: "image/svg+xml", href: "/wind.svg" },
];

export const meta: Route.MetaFunction = () => [
  { title: "Hermes" },
  {
    name: "description",
    content:
      "Simple to use. Really fast. Hermes is your chat room application.",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const AUTH_URL = `${config.apiUrl}/users/current`;

export default function App() {
  const { data, error, isLoading, mutate } = useSWR<
    AuthResponse,
    Error & { status: number }
  >(AUTH_URL, fetcher<AuthResponse>, { refreshInterval: 500 });

  let authStatus: AuthStatus;

  if (isLoading) {
    authStatus = { kind: "Loading" };
  } else if (error && error.status === 401) {
    authStatus = { kind: "LoggedOut", mutate: mutate };
  } else if (!error && data) {
    authStatus = {
      kind: "LoggedIn",
      userid: data.id,
      username: data.username,
      mutate: mutate,
    };
  } else {
    authStatus = { kind: "Error", error: error as Error };
  }

  return <Outlet context={authStatus} />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
