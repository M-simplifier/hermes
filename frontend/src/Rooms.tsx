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
    const { data: rooms, error, isLoading, mutate } = useSWR(URL, fetcher<RoomsResponse>)
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
        <div className="grid container mx-auto">
            <div className="grid grid-flow-col justify-between items-start">
                <NewRoom setRoom={setRoom} mutate={mutate}
                    title={title} setTitle={setTitle} />
                <Logout mutate={mutate} />
            </div>
            {rooms.map((room: Room) => (
                <RoomModule key={room.id} room={room} setRoom={setRoom} />
            ))}
        </div>
    )
}
