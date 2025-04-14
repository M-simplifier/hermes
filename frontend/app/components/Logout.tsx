import type { KeyedMutator } from "swr";

export default function Logout<T>({ mutate }: { mutate: KeyedMutator<T> }) {
  function handleClick() {
    localStorage.removeItem("jwtToken");
    void mutate();
  }

  return (
    <button
      className="border rounded-md text-main-bg bg-main h-full md:px-4 px-2 hover:text-main hover:bg-transparent"
      onClick={handleClick}
    >
      Logout
    </button>
  );
}
