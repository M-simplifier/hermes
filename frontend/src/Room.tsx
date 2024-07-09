import { SetState } from "./utils"

export type Room = {
    id: number,
    title: string,
}

export default function RoomModule({ room, setRoom }
    : { room: Room, setRoom: SetState<number> }) {
    return (
        <button
            className="p-8 hover:p-12 hover:text-xl transition-all break-all hyphens-auto"
            onClick={() => { setRoom(room.id) }} key={room.id}>
            {room.title.substring(0) + ((room.title.length > 30) ? "..." : "")}
        </button>
    )
}
