import { Typography } from "@mui/material";
import { ButtonBody, ButtonImage, DrawerButton, NavigationBody } from "./styles";
import cog from "../../assets/cog.svg"
import groups from "../../assets/groups.svg"
import tasks from "../../assets/tasks.svg"
import { useState } from "react";

interface INavigationProps {
    setPageTasks: () => void,
    setPageGroups: () => void,
    setPageConfig: () => void,
    showNav: boolean,
    setShowNav: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MainNavigation({setPageTasks, setPageGroups, setPageConfig, setShowNav, showNav}: INavigationProps) {

    return (
        <>
    
                <DrawerButton variant="outlined" color="inherit" onClick={() => setShowNav((value) => !value)}>
                    <span className="material-symbols-outlined">menu</span>
                </DrawerButton>
                <NavigationBody
                    flexDirection={"column"}
                    alignItems={"center"}
                    show={showNav}
                >
                    <Typography variant="h3">Tasker</Typography>

                    <ButtonBody onClick={setPageTasks}>
                        <Typography variant="h5">My Tasks</Typography>
                        <ButtonImage src={tasks} alt="" />
                    </ButtonBody>

                    <ButtonBody onClick={setPageGroups}>
                        <Typography variant="h5">Groups</Typography>
                        <ButtonImage src={groups} alt="" />
                    </ButtonBody>

                    <ButtonBody marginTop={"auto"} onClick={setPageConfig}>
                        <Typography variant="h5">Config</Typography>
                        <ButtonImage src={cog} alt="" />
                    </ButtonBody>


                </NavigationBody>
        </>
    )
}