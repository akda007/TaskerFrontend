import { ReactNode, useState } from "react"
import MainNavigation from "../../components/MainNavigation"
import { ContentDisplay, HomeLayout } from "./styles"
import TaskDisplay from "../../components/TasksDisplay"
import GroupsDisplay from "../../components/GroupsDisplay"

export default function Home() {
    const [content, setContent] = useState<ReactNode>(<></>)
    const [showNav, setShowNav] = useState(false);

    const handleSetTasks = () => {
        setContent(<TaskDisplay/>)
    }

    const handleSetGroups = () => {
        setContent(<GroupsDisplay/>)
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
                <ContentDisplay nvisible={showNav}>
                    {content}
                </ContentDisplay>
            </HomeLayout>
        </>
    )
}