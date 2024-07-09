import { FormEvent } from "react"
import { SetState } from "./utils"

export default function AuthenticateForm(
    {
        handleSubmit,
        setMode,
        currentMode,
        username, setUsername,
        password, setPassword,
    }
        : {
            handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
            setMode: SetState<"login" | "signup">,
            currentMode: "login" | "signup",
            username: string, setUsername: SetState<string>,
            password: string, setPassword: SetState<string>,
        }) {
    return (
        <div className="grid m-4">
            <form onSubmit={(e) => void handleSubmit(e)}
                className="grid md:w-[30rem] md:mx-auto mt-20">
                <input
                    className="border border-b-0 p-4 outline-none"
                    placeholder="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => { setUsername(e.target.value) }}
                    required />
                <input
                    className="border border-b-0 p-4 outline-none"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value) }}
                    required />
                <button
                    className="hover:bg-green-300 transition h-12 border"
                    type="submit"
                >
                    {
                        currentMode === "login" ?
                            "Login" :
                            "Signup"
                    }
                </button>
            </form>
            <button
                className="py-4 text-gray-400 transition-all hover:text-gray-800"
                onClick={() => {
                    setMode(
                        currentMode === "login" ?
                            "signup" :
                            "login",
                    )
                }}
            >
                {
                    currentMode === "login" ?
                        "Signup?" :
                        "Login?"
                }
            </button>
        </div>
    )
}
