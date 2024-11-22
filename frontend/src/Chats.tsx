import useSWR from "swr"
import fetcher from "./fetcher"
import NewChat from "./NewChat"
import { useState } from "react"
import ChatModule, { Chat } from "./Chat"
import Authenticate from "./Authenticate"
import Logout from "./Logout"
import { SetState } from "./utils"
import BackToHome from "./BackToHome"
import Header from "./Header"
import { config } from "./config"

type ChatsResponse = { title: string; chats: Chat[] }

export default function Chats({
  room,
  setRoom,
}: {
  room: number
  setRoom: SetState<number>
}) {
  const url = `${config.apiUrl}/${room}`
  const { data, error, isLoading, mutate } = useSWR<
    ChatsResponse,
    Error & { status: number }
  >(url, fetcher<ChatsResponse>, { refreshInterval: 500 })
  const [text, setText] = useState("")

  if (error?.status === 401) {
    return <Authenticate mutate={mutate} />
  }

  if (!data || error) {
    return <p>Something is wrong...</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="max-w-[64rem] mx-auto px-2">
      <Header>
        <BackToHome setRoom={setRoom} />
        <Logout mutate={mutate} />
      </Header>
      <h1 className="text-4xl text-center my-8 break-all">{data.title}</h1>
      {data.chats.map((chat) => (
        <ChatModule key={chat.id} chat={chat} />
      ))}
      <NewChat
        text={text}
        setText={setText}
        room={room}
        mutate={() => void mutate()}
      />
    </div>
  )
}
