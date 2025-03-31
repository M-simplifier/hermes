import type { FormEvent } from "react";
import type { SetState } from "./utils";

export default function AuthenticateForm({
  handleSubmit,
  setMode,
  currentMode,
  username,
  setUsername,
  password,
  setPassword,
}: {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setMode: SetState<"login" | "signup">;
  currentMode: "login" | "signup";
  username: string;
  setUsername: SetState<string>;
  password: string;
  setPassword: SetState<string>;
}) {
  return (
    <div className="grid sm:max-w-[30rem] sm:mx-auto mx-8 mt-20">
      <form onSubmit={(e) => void handleSubmit(e)} className="grid">
        <input
          className="border border-b-0 p-4 outline-none focus:placeholder:invisible placeholder:text-sub bg-transparent"
          size={8}
          placeholder="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          className="border border-b-0 p-4 outline-none focus:placeholder:invisible placeholder:text-sub bg-transparent"
          size={8}
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button
          className="hover:bg-main hover:text-main-bg h-12 border"
          type="submit"
        >
          {currentMode === "login" ? "Login" : "Signup"}
        </button>
      </form>
      <button
        className="py-4 hover:bg-main hover:text-main-bg"
        onClick={() => {
          setMode(currentMode === "login" ? "signup" : "login");
        }}
      >
        {currentMode === "login" ? "Signup?" : "Login?"}
      </button>
    </div>
  );
}
