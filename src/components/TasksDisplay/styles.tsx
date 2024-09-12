import { Button, Stack, styled } from "@mui/material";

export const ContentHolder = styled(Stack)(({theme}) => ({
    flexDirection: "row",
    width: "100%",
    minHeight: "100%",
    position: "relative",
    flexWrap: "wrap",
    gap: "30px",
    
    justifyContent: "center",
}))

export const AddButton = styled(Button)(({theme}) => ({
    borderRadius: "50%",
    aspectRatio: 1/1,
    width: "60px",
    backgroundColor: "white",
    position: "fixed",
    bottom: "5%",
    right: "5%"
}))