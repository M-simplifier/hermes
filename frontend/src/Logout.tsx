import { KeyedMutator } from "swr"

export default function Logout<T>({ mutate }: { mutate: KeyedMutator<T> }) {
    function handleClick() {
        localStorage.removeItem("jwtToken")
        void mutate()
    }

    return (
        <button
            className="border-b border-white hover:border-red-300 transition"
            onClick={handleClick}>
            Logout
        </button>
    )
}
