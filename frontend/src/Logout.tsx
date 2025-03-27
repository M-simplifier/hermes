import { KeyedMutator } from "swr"

export default function Logout<T>({ mutate }: { mutate: KeyedMutator<T> }) {
  function handleClick() {
    localStorage.removeItem("jwtToken")
    void mutate()
  }

  return (
    <button
      className="border rounded-md text-[var(--main-background-color)] bg-[var(--main-color)] h-full md:px-4 px-2 hover:text-[var(--main-color)] hover:bg-transparent"
      onClick={handleClick}
    >
      Logout
    </button>
  )
}
