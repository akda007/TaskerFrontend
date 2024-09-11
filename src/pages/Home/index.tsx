import { ReactNode, useContext, useState } from "react"
import { SessionContext } from "../../providers/SessionContext"
import MainNavigation from "../../components/MainNavigation"
import { Box, Stack } from "@mui/material"
import { HomeLayout } from "./styles"

export default function Home() {

    const { token } = useContext(SessionContext)
    const [content, setContent] = useState<ReactNode>(<></>)
    const [showNav, setShowNav] = useState(false);

    const handleSetTasks = () => {
        setContent(<h2>Tasks</h2>)
    }

    const handleSetGroups = () => {
        setContent(<h2>Groups</h2>)
    }

    const handleSetConfig = () => {
        setContent(<h2>Config</h2>)
    }

    return (
        <>
            <HomeLayout>
                <MainNavigation
                    setPageConfig={handleSetConfig} 
                    setPageGroups={handleSetGroups}
                    setPageTasks={handleSetTasks}
                    setShowNav={setShowNav}
                    showNav={showNav}
                />
                <Stack>
                    {content}
                </Stack>
            </HomeLayout>
        </>
    )
}