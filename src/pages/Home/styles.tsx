import { Stack, styled } from "@mui/material";

export const HomeLayout = styled(Stack)(({theme}) => ({
    flexDirection: "row",

    [theme.breakpoints.down("sm")]: {
        flexDirection: "column"
    }
}))


interface IContentDisplay {
    nvisible: boolean;
}

export const ContentDisplay = styled(Stack)<IContentDisplay>(({theme, nvisible: visible}) => ({
    width: "100%",
    display: "flex",

    [theme.breakpoints.down("sm")]: {
        display: visible ? "none" : "flex"
    }
}))