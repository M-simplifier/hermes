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
    <form
      className="grid my-8 sm:grid-cols-[1fr_auto] sm:items-center bg-[var(--sub-background-color)] p-4 rounded-md"
      onSubmit={(e) => void handleSubmit(e)}
    >
      <textarea
        className="outline-none resize-none p-4 focus:placeholder:invisible placeholder:text-[var(--sub-color)] bg-[var(--light-background-color)] rounded-md"
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
        className="rounded-md border h-12 hover:bg-[var(--main-color)] hover:text-[var(--main-background-color)] w-16 mx-auto mt-4 sm:ml-4"
        type="submit"
      >
        Send
      </button>
    </form>
  )
}
