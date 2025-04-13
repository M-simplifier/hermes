import type { FormEvent } from "react";
import { login, type SetState, signup } from "./utils";
import AuthenticateForm from "./AuthenticateForm";
import { config } from "./config";
import { useNavigate } from "react-router";

const tokenURL = `${config.apiUrl}/auth/token`;
const signupURL = `${config.apiUrl}/auth/`;

export default function Signup({
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

    const successOfSignup = await signup(username, password, signupURL);

    if (!successOfSignup) {
      alert("Signup Failed");
      return;
    }

    const successOfLogin = await login(username, password, tokenURL);

    if (!successOfLogin) {
      alert("Login Failed");
      return;
    }

    await navigate(-1);
  };

  return (
    <AuthenticateForm
      handleSubmit={handleSubmit}
      setMode={setMode}
      currentMode="signup"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );
}
