import { Stack, Typography } from "@mui/material"

export default function MenuContext() {
    return (
        <div
            onContextMenu={(e) => {
                e.preventDefault()
            }}
        >
            <Stack>
                <Stack flexDirection={"row"}>
                    <Typography>Delete</Typography>
                </Stack>
            </Stack>
        </div>
    )
}