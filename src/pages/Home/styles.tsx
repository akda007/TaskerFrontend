// import { styled } from "@mui/material";
// import { Stack } from "@mui/system";

import { Stack, styled } from "@mui/material";

export const HomeLayout = styled(Stack)(({theme}) => ({
    flexDirection: "row",

    [theme.breakpoints.down("sm")]: {
        flexDirection: "column"
    }
}))