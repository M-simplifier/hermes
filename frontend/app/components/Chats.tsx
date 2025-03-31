import useSWR from "swr";
import fetcher from "./fetcher";
import NewChat from "./NewChat";
import ChatModule, { type Chat } from "./Chat";
import Authenticate from "./Authenticate";
import Logout from "./Logout";
import BackToHome from "./BackToHome";
import Header from "./Header";
import { config } from "./config";

interface ChatsResponse {
  title: string;
  chats: Chat[];
}

export default function Chats({ roomId }: { roomId: number }) {
  const url = `${config.apiUrl}/${String(roomId)}`;
  const { data, error, isLoading, mutate } = useSWR<
    ChatsResponse,
    Error & { status: number }
  >(url, fetcher<ChatsResponse>, { refreshInterval: 500 });

  if (error?.status === 401) {
    return <Authenticate mutate={mutate} />;
  }

  if (!data || error) {
    return <p>Something is wrong...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-[64rem] mx-auto px-2">
      <Header>
        <BackToHome />
        <Logout mutate={mutate} />
      </Header>
      <h1 className="text-4xl text-center my-8 break-all">{data.title}</h1>
      {data.chats.map((chat) => (
        <ChatModule key={chat.id} chat={chat} />
      ))}
      <NewChat roomId={roomId} mutate={() => void mutate()} />
    </div>
  );
}
