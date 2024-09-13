/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack, styled } from "@mui/material";

interface ITaskBodyProps {
    shadowColor: string
}

export const TaskBody = styled(Stack)<ITaskBodyProps>(({theme, shadowColor}) => ({
    backgroundColor: "#f5f5f5",
    width: "300px",
    minWidth: "300px",
    maxHeight: "300px",
    aspectRatio: "4 / 2",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: `3px 3px 15px 5px ${shadowColor}`,
    display: "flex",
    position: "relative",
    justifyContent: "space-between",

    "&:active": {
        outline: "solid"
    },
}))