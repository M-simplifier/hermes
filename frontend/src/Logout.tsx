import { KeyedMutator } from "swr"

export default function Logout<T>({ mutate }: { mutate: KeyedMutator<T> }) {
  function handleClick() {
    localStorage.removeItem("jwtToken")
    void mutate()
  }

  return (
    <button
      className="border text-stone-50 bg-stone-700 h-full md:px-4 px-2 hover:text-stone-700 hover:bg-stone-50"
      onClick={handleClick}
    >
      Logout
    </button>
  )
}
