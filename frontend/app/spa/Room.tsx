import type { SetState } from "./utils";

export interface Room {
  id: number;
  title: string;
}

export default function RoomModule({
  room,
  setRoom,
}: {
  room: Room;
  setRoom: SetState<number>;
}) {
  return (
    <button
      className="p-8 hover:bg-main hover:text-main-bg break-all hyphens-auto text-left bg-sub-bg rounded-md mb-2"
      onClick={() => {
        setRoom(room.id);
      }}
      key={room.id}
    >
      {room.title.substring(0) + (room.title.length > 30 ? "..." : "")}
    </button>
  );
}
