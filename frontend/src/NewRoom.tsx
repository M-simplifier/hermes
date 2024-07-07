import { FormEvent } from "react"
import { SetState } from "./utils"
import { config } from "./config"

export default function NewRoom({ setRoom, mutate, title, setTitle }
    : {
        setRoom: SetState<number>,
        mutate: () => void,
        title: string,
        setTitle: SetState<string>,
    }) {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const body = {
            title,
        }

        const token = localStorage.getItem("jwtToken")

        const res = await fetch(`${config.apiUrl}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })

        if (res.ok) {
            setRoom(parseInt(res.headers.get("location")!))
        } else if (res.status === 401) {
            mutate()
        }
    }

    return (
        <form className="grid grid-flow-col" onSubmit={handleSubmit}>
            <input
                className="outline-none border-b lg:w-[30rem] md:w-[20rem] focus:border-gray-700 transition-all"
                placeholder="Room Title"
                type="text"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required />
            <button
                className="h-full text-gray-400 hover:text-gray-700 px-1 transition"
                type="submit">New</button>
        </form>
    )
}
