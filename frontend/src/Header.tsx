import { ReactNode } from "react"

export default function Header({ children }: { children: ReactNode }) {
    return (
        <header className="grid grid-flow-col justify-between">
            {children}
        </header>
    )
}
