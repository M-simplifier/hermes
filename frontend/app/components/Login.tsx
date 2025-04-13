import type { FormEvent } from "react";
import { login, type SetState } from "./utils";
import AuthenticateForm from "./AuthenticateForm";
import { config } from "./config";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login(username, password, tokenURL);

    if (!success) {
      alert("Login Failed");
      return;
    }

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
