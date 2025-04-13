import useSWR from "swr";
import fetcher from "./fetcher";
import NewRoom from "./NewRoom";
import { useState } from "react";
import RoomModule, { type Room } from "./Room";
import Logout from "./Logout";
import { config } from "./config";
import Header from "./Header";

const URL = `${config.apiUrl}/`;

type RoomsResponse = Room[];

export default function Rooms() {
  const {
    data: rooms,
    error,
    isLoading,
    mutate,
  } = useSWR<RoomsResponse, Error & { status: number }>(
    URL,
    fetcher<RoomsResponse>,
    { refreshInterval: 500 },
  );
  const [title, setTitle] = useState("");

  if (!rooms || error) {
    return <p>Something is wrong...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid max-w-[64rem] mx-auto px-2">
      <Header>
        <h1 className="text-4xl animate-[logo_1s_linear_forwards]">Hermes</h1>
        <Logout mutate={mutate} />
      </Header>
      <NewRoom mutate={() => void mutate()} title={title} setTitle={setTitle} />
      {rooms.map((room: Room) => (
        <RoomModule key={room.id} room={room} />
      ))}
    </div>
  );
}
