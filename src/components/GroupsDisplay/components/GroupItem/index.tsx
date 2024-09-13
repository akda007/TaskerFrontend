import { Button, Stack, Typography } from "@mui/material";


export default function GroupItem({name}: {name: string}) {
    return (
        <>
            <Stack 
                sx={{
                    borderRadius: "15px",
                    backgroundColor: "#eaeaea",
                    padding: "20px",
                    cursor: "pointer"
                }}
                gap={2}
            >
                <Typography color="textPrimary">{name}</Typography>
            </Stack>
        </>
    )
}