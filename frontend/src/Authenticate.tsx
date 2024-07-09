import { useState } from "react"
import Login from "./Login"
import Signup from "./Signup"
import { KeyedMutator } from "swr"

export default function Authenticate<T>({ mutate }: { mutate: KeyedMutator<T> }) {
    const [mode, setMode] = useState<"login" | "signup">("login")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    if (mode === "login") {
        return <Login mutate={mutate} setMode={setMode}
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword} />
    } else {
        return <Signup mutate={mutate} setMode={setMode}
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword} />
    }
}
