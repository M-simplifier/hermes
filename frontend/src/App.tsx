import { useState } from "react"
import Rooms from "./Rooms"
import Chats from "./Chats"

function App() {
  const [room, setRoom] = useState(0)

  if (room === 0) {
    return <Rooms setRoom={setRoom} />
  }

  return <Chats room={room} setRoom={setRoom} />
}

export default App
