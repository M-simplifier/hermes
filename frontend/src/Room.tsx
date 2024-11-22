import { SetState } from "./utils"

export type Room = {
  id: number
  title: string
}

export default function RoomModule({
  room,
  setRoom,
}: {
  room: Room
  setRoom: SetState<number>
}) {
  return (
    <button
      className="p-8 hover:bg-stone-700 hover:text-stone-50 break-all hyphens-auto text-left border mb-2"
      onClick={() => {
        setRoom(room.id)
      }}
      key={room.id}
    >
      {room.title.substring(0) + (room.title.length > 30 ? "..." : "")}
    </button>
  )
}
