import { FormEvent } from "react"
import { login, SetState, signup } from "./utils"
import AuthenticateForm from "./AuthenticateForm"
import { KeyedMutator } from "swr"
import { config } from "./config"

const tokenURL = `${config.apiUrl}/auth/token`
const signupURL = `${config.apiUrl}/auth/`

export default function Signup<T>(
    { mutate, setMode, username, setUsername, password, setPassword }
        : {
            mutate: KeyedMutator<T>,
            setMode: SetState<"login" | "signup">
            username: string, setUsername: SetState<string>,
            password: string, setPassword: SetState<string>,
        }) {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const successOfSignup = await signup(
            username,
            password,
            signupURL,
        )

        if (!successOfSignup) {
            alert("Signup Failed")
            return
        }

        const successOfLogin = await login(
            username,
            password,
            tokenURL,
        )

        if (!successOfLogin) {
            alert("Login Failed")
            return
        }

        void mutate()
    }

    return (
        <AuthenticateForm
            handleSubmit={handleSubmit}
            setMode={setMode}
            currentMode="signup"
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
        />
    )
}
