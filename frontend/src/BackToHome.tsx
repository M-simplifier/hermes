import { SetState } from "./utils"

export default function BackToHome({ setRoom }: { setRoom: SetState<number> }) {
  return (
    <button
      className="border-b border-white hover:border-blue-300 transition"
      onClick={() => {
        setRoom(0)
      }}
    >
      Back To Home
    </button>
  )
}
