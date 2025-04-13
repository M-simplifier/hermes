import useSWR from "swr";
import fetcher from "./fetcher";
import { config } from "./config";

export interface Chat {
  id: number;
  text: string;
  room_id: number;
  owner_id: number;
}

interface UserResponse {
  id: number;
  username: string;
}

export default function ChatModule({ chat }: { chat: Chat }) {
  const url = `${config.apiUrl}/users/${String(chat.owner_id)}`;
  const {
    data: user,
    error,
    isLoading,
  } = useSWR<UserResponse, Error & { status: number }>(
    url,
    fetcher<UserResponse>,
    { refreshInterval: 500 },
  );

  if (!user || error) {
    return <p>Something is wrong...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-2 p-4 rounded-md bg-sub-bg grid grid-cols-[auto_1fr]">
      <p className="font-bold mr-4">{user.username}:</p>
      <p className="whitespace-pre-wrap" key={chat.id}>
        {chat.text}
      </p>
    </div>
  );
}
