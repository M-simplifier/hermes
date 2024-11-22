import useSWR from "swr"
import fetcher from "./fetcher"
import NewRoom from "./NewRoom"
import Authenticate from "./Authenticate"
import { SetState } from "./utils"
import { useState } from "react"
import RoomModule, { Room } from "./Room"
import Logout from "./Logout"
import { config } from "./config"

const URL = `${config.apiUrl}/`

type RoomsResponse = Room[]

export default function Rooms({ setRoom }: { setRoom: SetState<number> }) {
  const {
    data: rooms,
    error,
    isLoading,
    mutate,
  } = useSWR<RoomsResponse, Error & { status: number }>(
    URL,
    fetcher<RoomsResponse>,
    { refreshInterval: 500 },
  )
  const [title, setTitle] = useState("")

  if (error?.status === 401) {
    return <Authenticate mutate={mutate} />
  }

  if (!rooms || error) {
    return <p>Something is wrong...</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="grid max-w-[64rem] mx-auto px-2">
      <div className="grid grid-cols-[1fr_auto] my-4">
        <NewRoom
          setRoom={setRoom}
          mutate={() => void mutate()}
          title={title}
          setTitle={setTitle}
        />
        <Logout mutate={mutate} />
      </div>
      {rooms.map((room: Room) => (
        <RoomModule key={room.id} room={room} setRoom={setRoom} />
      ))}
    </div>
  )
}
