import { Link } from "react-router";

export interface Room {
  id: number;
  title: string;
}

export default function RoomModule({ room }: { room: Room }) {
  return (
    <Link
      className="p-8 hover:bg-main hover:text-main-bg break-all hyphens-auto text-left bg-sub-bg rounded-md mb-2"
      to={`/room/${String(room.id)}`}
    >
      {room.title.substring(0) + (room.title.length > 30 ? "..." : "")}
    </Link>
  );
}
