import useSWR from "swr"
import fetcher from "./fetcher"
import Authenticate from "./Authenticate"
import { config } from "./config"

export type Chat = {
    id: number,
    text: string,
    room_id: number,
    owner_id: number,
}

type UserResponse = { id: number, username: string }

export default function ChatModule({ chat }: { chat: Chat }) {
    const url = `${config.apiUrl}/users/${chat.owner_id}`
    const { data: user, error, isLoading, mutate } = useSWR(url, fetcher<UserResponse>)

    if (error?.status === 401) {
        return <Authenticate mutate={mutate} />
    }

    if (!user || error) {
        return <p>Something is wrong...</p>
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="m-4">
            <p className="font-bold">{user.username}</p>
            <p className="whitespace-pre-wrap" key={chat.id}>{chat.text}</p>
        </div>
    )

}