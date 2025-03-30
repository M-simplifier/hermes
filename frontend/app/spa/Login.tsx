import type { FormEvent } from "react";
import { login, type SetState } from "./utils";
import AuthenticateForm from "./AuthenticateForm";
import type { KeyedMutator } from "swr";
import { config } from "./config";

const tokenURL = `${config.apiUrl}/auth/token`;

export default function Login<T>({
  mutate,
  setMode,
  username,
  setUsername,
  password,
  setPassword,
}: {
  mutate: KeyedMutator<T>;
  setMode: SetState<"login" | "signup">;
  username: string;
  setUsername: SetState<string>;
  password: string;
  setPassword: SetState<string>;
}) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login(username, password, tokenURL);

    if (!success) {
      alert("Login Failed");
      return;
    }

    void mutate();
  };

  return (
    <AuthenticateForm
      handleSubmit={handleSubmit}
      setMode={setMode}
      currentMode="login"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );
}
