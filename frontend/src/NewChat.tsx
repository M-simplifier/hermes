import { FormEvent } from "react"
import { SetState } from "./utils"
import { config } from "./config"

export default function NewChat({
  room,
  mutate,
  text,
  setText,
}: {
  room: number
  mutate: () => void
  text: string
  setText: SetState<string>
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
        Authorization: `Bearer ${token}`,
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
    <form className="grid my-8" onSubmit={(e) => void handleSubmit(e)}>
      <textarea
        className="outline-none resize-none border p-4 focus:placeholder:invisible"
        rows={10}
        placeholder="Your Chat"
        name="title"
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
        required
      />
      <button
        className="border border-t-0 h-12 hover:bg-stone-700 hover:text-stone-50"
        type="submit"
      >
        Send
      </button>
    </form>
  )
}
