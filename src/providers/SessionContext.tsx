import { createContext, ReactNode, useState } from "react"

interface ISessionContext {
    token: string,
    setToken: (token: string) => void
}

export const SessionContext = createContext({} as ISessionContext)

export function SessionProvider({children}: {children: ReactNode}) {
    const [_token, _setToken] = useState("")

    const setToken = (token: string) => {
        _setToken(token)
    }

    return (
        <SessionContext.Provider value={{token: _token, setToken}}>
            {children}
        </SessionContext.Provider>
    )
}