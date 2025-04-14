import type { ReactNode } from "react";
import fetcher from "./fetcher";
import LoginButton from "./LoginButton";
import Logout from "./Logout";
import useSWR from "swr";
import { config } from "./config";

const AUTH_URL = `${config.apiUrl}/users/current`;

interface AuthResponse {
  id: number;
  username: string;
}

export default function Header({ children }: { children: ReactNode }) {
  const { error, isLoading, mutate } = useSWR<
    AuthResponse,
    Error & { status: number }
  >(AUTH_URL, fetcher<AuthResponse>, { refreshInterval: 500 });

  let loginOrLogout;
  if (isLoading) {
    loginOrLogout = (
      <div className="border md:p-4 p-2 hover:text-main-bg hover:bg-main rounded-md">
        Loading...
      </div>
    );
  } else if (error && error.status !== 401) {
    loginOrLogout = (
      <div className="border md:p-4 p-2 hover:text-main-bg hover:bg-main rounded-md">
        Error
      </div>
    );
  } else if (error && error.status === 401) {
    loginOrLogout = <LoginButton />;
  } else if (!error) {
    loginOrLogout = <Logout mutate={mutate} />;
  }

  return (
    <header className="grid grid-flow-col justify-between mt-4 min-h-16 items-center">
      {children}
      {loginOrLogout}
    </header>
  );
}
