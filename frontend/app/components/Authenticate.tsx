import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Authenticate() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (mode === "login") {
    return (
      <Login
        setMode={setMode}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    );
  } else {
    return (
      <Signup
        setMode={setMode}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    );
  }
}
