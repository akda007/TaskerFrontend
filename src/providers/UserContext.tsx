import { createContext, ReactNode, useState } from "react"

interface ISessionContext {
    username: string,
    setUsername: (value: string) => void
    email: string,
    setEmail: (value: string) => void
}

export const UserContext = createContext({} as ISessionContext)

export function UserProvider({children}: {children: ReactNode}) {
    const [username, _setUsername] = useState("")
    const [email, _setEmail] = useState("")

    const setUsername = (value: string) => {
        _setUsername(value)
    }

    const setEmail = (value: string) => {
        _setEmail(value)
    }

    return (
        <UserContext.Provider value={{setEmail, setUsername, username, email}}>
            {children}
        </UserContext.Provider>
    )
}