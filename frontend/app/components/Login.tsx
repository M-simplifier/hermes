import type { FormEvent } from "react";
import { login, type AuthResponse, type SetState } from "./utils";
import AuthenticateForm from "./AuthenticateForm";
import { config } from "./config";
import { useNavigate, useOutletContext } from "react-router";
import type { KeyedMutator } from "swr";

const tokenURL = `${config.apiUrl}/auth/token`;

export default function Login({
  setMode,
  username,
  setUsername,
  password,
  setPassword,
}: {
  setMode: SetState<"login" | "signup">;
  username: string;
  setUsername: SetState<string>;
  password: string;
  setPassword: SetState<string>;
}) {
  const { mutate } = useOutletContext<{ mutate: KeyedMutator<AuthResponse> }>();
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login(username, password, tokenURL);

    if (!success) {
      alert("Login Failed");
      return;
    }

    await mutate();
    await navigate(-1);
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
