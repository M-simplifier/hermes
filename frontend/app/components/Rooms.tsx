import useSWR from "swr";
import fetcher from "./fetcher";
import NewRoom from "./NewRoom";
import { useState } from "react";
import RoomModule, { type Room } from "./Room";
import { config } from "./config";
import Header from "./Header";
import { useOutletContext } from "react-router";
import type { AuthStatus } from "./utils";

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

  const authState = useOutletContext<AuthStatus>();

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
      </Header>
      {authState.kind === "LoggedIn" && (
        <NewRoom
          mutate={() => void mutate()}
          title={title}
          setTitle={setTitle}
        />
      )}
      {rooms.map((room: Room) => (
        <RoomModule key={room.id} room={room} />
      ))}
    </div>
  );
}
