import { FormEvent } from "react"
import { SetState } from "./utils"
import { config } from "./config"

export default function NewChat({ room, mutate, text, setText }
    : {
        room: number,
        mutate: () => void,
        text: string, setText: SetState<string>,
    }) {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const body = {
            text: text.trim(),
        }

        const token = localStorage.getItem("jwtToken")

        const res = await fetch(`${config.apiUrl}/${room}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })

        if (res.ok) {
            setText("")
            mutate()
        } else if (res.status === 401) {
            mutate()
        }
    }

    return (
        <form className="grid m-4" onSubmit={handleSubmit}>
            <textarea
                className="outline-none resize-none border p-4"
                rows={10}
                placeholder="Your Chat"
                name="title"
                value={text}
                onChange={e => setText(e.target.value)}
                required />
            <button className="border border-t-0 h-12 transition hover:bg-green-200" type="submit">Send</button>
        </form>
    )
}