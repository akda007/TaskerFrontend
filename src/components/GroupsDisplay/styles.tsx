import { styled, Stack, Button } from "@mui/material";

export const GroupListContainer = styled(Stack)(() => ({
    backgroundColor: "white",
    width: "80%",
    height: "80%",
    borderRadius: "15px",
    padding: "20px",
    position: "relative"
}))

export const AddButton = styled(Button)(({theme}) => ({
    borderRadius: "50%",
    aspectRatio: 1/1,
    width: "60px",
    backgroundColor: "white",
    position: "absolute",
    bottom: "5%",
    left: "50%",
    right: "50%",
    transform: "translateX(-50%)"
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