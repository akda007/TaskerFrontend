import { ReactNode, useState } from "react"
import MainNavigation from "../../components/MainNavigation"
import { ContentDisplay, HomeLayout } from "./styles"
import TaskDisplay from "../../components/TasksDisplay"
import GroupsDisplay from "../../components/GroupsDisplay"

export default function Home() {
    const [content, setContent] = useState<ReactNode>(<></>)
    const [showNav, setShowNav] = useState(false);

    const handleSetTasks = () => {
        setContent(<></>)

        setTimeout(() => {
            setContent(<TaskDisplay/>)
        })
    }

    const handleSetGroups = () => {
        setContent(<></>)

        setTimeout(() => {
            setContent(<GroupsDisplay/>)
        })
    }

    const handleSetProfile = () => {
        setContent(<></>)

        setTimeout(() => {
            setContent(<h2>Profile</h2>)
        })
    }

    return (
        <>
            <HomeLayout>
                <MainNavigation
                    setPageProfile={handleSetProfile} 
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