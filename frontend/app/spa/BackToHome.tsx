import type { SetState } from "./utils";

export default function BackToHome({ setRoom }: { setRoom: SetState<number> }) {
  return (
    <button
      className="border md:p-4 p-2 hover:text-main-bg hover:bg-main rounded-md"
      onClick={() => {
        setRoom(0);
      }}
    >
      Back To Home
    </button>
  );
}
