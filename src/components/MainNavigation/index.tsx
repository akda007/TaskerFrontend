import { Button, Typography } from "@mui/material";
import { ButtonBody, ButtonImage, DrawerButton, NavigationBody } from "./styles";
import cog from "../../assets/cog.svg"
import groups from "../../assets/groups.svg"
import tasks from "../../assets/tasks.svg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface INavigationProps {
    setPageTasks: () => void,
    setPageGroups: () => void,
    setPageProfile: () => void,
    showNav: boolean,
    setShowNav: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MainNavigation({setPageTasks, setPageGroups, setPageProfile, setShowNav, showNav}: INavigationProps) {
    const navigate = useNavigate()

    const logoutHandler = () => {
        sessionStorage.removeItem("token")
        navigate("/")
    }
    return (
        <>
    
                <DrawerButton variant="outlined" color="inherit" onClick={() => setShowNav((value) => !value)}>
                    <span className="material-symbols-outlined">menu</span>
                </DrawerButton>
                <NavigationBody
                    flexDirection={"column"}
                    alignItems={"center"}
                    show={showNav}
                    position={"relative"}
                >
                    <Typography variant="h3">Tasker</Typography>

                    <ButtonBody onClick={() => {setShowNav(false); setPageTasks();}}>
                        <Typography variant="h5">My Tasks</Typography>
                        <ButtonImage src={tasks} alt="" />
                    </ButtonBody>

                    <ButtonBody onClick={() => {setShowNav(false); setPageGroups();}}>
                        <Typography variant="h5">Groups</Typography>
                        <ButtonImage src={groups} alt="" />
                    </ButtonBody>

                    <ButtonBody marginTop={"auto"} onClick={() => {setShowNav(false); setPageProfile();}}>
                        <Typography variant="h5">Profile</Typography>
                        <ButtonImage src={cog} alt="" />
                    </ButtonBody>

                    <Button variant="outlined" color="error" sx={{
                        position:'absolute',
                        top:  "2%",
                        left:  "3%",
                        borderRadius: "50%",
                        height: "40px",
                        minWidth: 0,
                        aspectRatio: "1 / 1"
                    }}
                    onClick={logoutHandler}
                    >
                        <span className="material-symbols-outlined">logout</span>
                    </Button>
                </NavigationBody>
        </>
    )
}