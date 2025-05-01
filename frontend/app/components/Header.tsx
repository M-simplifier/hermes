import type { ReactNode } from "react";
import LoginButton from "./LoginButton";
import Logout from "./Logout";
import { useOutletContext } from "react-router";
import type { AuthStatus } from "./utils";

export default function Header({ children }: { children: ReactNode }) {
  const authStatus = useOutletContext<AuthStatus>();

  let loginOrLogout;

  if (authStatus.kind === "Loading") {
    loginOrLogout = (
      <div className="border md:p-4 p-2 hover:text-main-bg hover:bg-main rounded-md">
        Loading...
      </div>
    );
  } else if (authStatus.kind === "LoggedOut") {
    loginOrLogout = <LoginButton />;
  } else if (authStatus.kind === "LoggedIn") {
    loginOrLogout = <Logout mutate={authStatus.mutate} />;
  } else {
    loginOrLogout = (
      <div className="border md:p-4 p-2 hover:text-main-bg hover:bg-main rounded-md">
        Error
      </div>
    );
  }

  return (
    <header className="grid grid-flow-col justify-between my-4 min-h-16 items-center">
      {children}
      {loginOrLogout}
    </header>
  );
}
