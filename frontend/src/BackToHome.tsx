import { SetState } from "./utils"

export default function BackToHome({ setRoom }: { setRoom: SetState<number> }) {
  return (
    <button
      className="border md:p-4 p-2 hover:text-stone-50 hover:bg-stone-700"
      onClick={() => {
        setRoom(0)
      }}
    >
      Back To Home
    </button>
  )
}
