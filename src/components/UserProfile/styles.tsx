import { Stack, styled } from "@mui/material"

export const InfoContainer = styled(Stack)(() => ({
    backgroundColor: "white",
    width: "80%",
    borderRadius: "15px",
    padding: "20px",
    position: "relative"
}))

export const MainContentHolder = styled(Stack)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
        height: "100vh"
    }
}))