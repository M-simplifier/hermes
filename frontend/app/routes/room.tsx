import type { Route } from "./+types/room";
import Chats from "~/components/Chats";

export default function Room({ params }: Route.ComponentProps) {
  const roomId = parseInt(params.roomId);
  return <Chats roomId={roomId} />;
}
