/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Stack, styled } from "@mui/material";

interface INavigationBody {
    show: boolean
}

export const NavigationBody = styled(Stack)<INavigationBody>(({ theme, show }) => ({
    backgroundColor:"rgb(255, 255, 255)",
    height: "100vh",
    minWidth: "320px",
    gap: "30px",
    padding: "10px 20px",
    transition: "300ms",
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
        height: show ? "100vh" : "0px",
        padding: show ? "10px 20px" : "0px"
    },    

    [theme.breakpoints.up("sm")]: {
        alignSelf: "start"            
    }
}))

export const DrawerButton = styled(Button)(({theme}) => ({
    position: "absolute",
    top: "2%",
    right: "2%",
    maxWidth: "50px",
    zIndex: "999",
    backgroundColor: "white",

    [theme.breakpoints.up("sm")]: {
        ...{
            display: "none"
        }
    }
}))


export const ButtonBody = styled(Stack)(({}) => ({
    justifyContent: "space-between",
    borderRadius: "5px",
    backgroundColor: "#dfdfdf",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    padding: "10px 20px",
    transition: "100ms",
    boxShadow: "4px 4px 10px 3px #0000002a",
    maxWidth: "500px",
    minWidth: "280px",
    maxHeight: "78px",

    "&:hover": {
        backgroundColor: "#c5c5c5",
    },

    "&:active": {
        backgroundColor: "#dbdbdb",
        transform: "translateY(1px) scale(0.99)"
    },

}))

interface ITheRealShitProps {
    pimba?: boolean
}

export const TheRealShit = styled(Stack)<ITheRealShitProps>(({ theme, pimba }) => ({
    justifyContent: "space-between",
    backgroundColor: pimba ? "red" : "green",
    fontFamily: theme.typography.fontFamily
}))

export const ButtonImage = styled("img")`
    object-fit: cover;
`