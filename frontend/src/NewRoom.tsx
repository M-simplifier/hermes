import { FormEvent } from "react"
import { SetState } from "./utils"
import { config } from "./config"

export default function NewRoom({
  setRoom,
  mutate,
  title,
  setTitle,
}: {
  setRoom: SetState<number>
  mutate: () => void
  title: string
  setTitle: SetState<string>
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      const location = res.headers.get("location")
      const roomNumber = location ? parseInt(location) : NaN
      if (!isNaN(roomNumber)) {
        setRoom(roomNumber)
      } else {
        alert("Sorry, something is wrong...")
      }
    } else if (res.status === 401) {
      mutate()
    } else {
      alert("Sorry, something is wrong...")
    }
  }

  return (
    <form
      className="grid grid-cols-[1fr_auto] md:mr-4"
      onSubmit={(e) => void handleSubmit(e)}
    >
      <input
        className="outline-none border border-r-0 md:p-4 p-2 focus:placeholder:invisible"
        size={8}
        placeholder="Room Title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        required
      />
      <button
        className="h-full md:p-4 p-2 border hover:text-stone-50 hover:bg-stone-700"
        type="submit"
      >
        New
      </button>
    </form>
  )
}
