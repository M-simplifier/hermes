import { Dispatch, SetStateAction } from "react"

export type SetState<T> = Dispatch<SetStateAction<T>>

export async function signup(
    username: string,
    password: string,
    signupURL: string,
): Promise<boolean> {
    const body = {
        username,
        password,
    }

    const resSignup = await fetch(signupURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    if (!resSignup.ok) {
        return false
    }

    return true
}

export async function login(
    username: string,
    password: string,
    tokenURL: string,
): Promise<boolean> {
    const formData = new URLSearchParams()
    formData.append("username", username)
    formData.append("password", password)

    const resToken = await fetch(tokenURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
    })

    if (!resToken.ok) {
        return false
    }

    const data = await resToken.json() as { access_token: string }
    localStorage.setItem("jwtToken", data.access_token)
    return true
}
