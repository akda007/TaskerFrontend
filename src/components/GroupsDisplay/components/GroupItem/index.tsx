import { Button, Stack, Typography } from "@mui/material";
import AddPersonModal from "../AddPersonModal";
import { useState } from "react";

interface IGroupItemProps {
    groupId: number
    name: string
    onClick: () => void
    onDelete: () => void
    forceUpdate: () => void
}

export default function GroupItem({groupId, name, onClick, onDelete, forceUpdate}: IGroupItemProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <AddPersonModal
                open={open}
                forceReload={forceUpdate}
                groupId={groupId}
                setOpen={setOpen}
            />

            <Stack 
                onClick={onClick}
                sx={{
                    borderRadius: "15px",
                    backgroundColor: "#eaeaea",
                    padding: "20px",
                    cursor: "pointer"
                }}
                gap={2}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection={"row"}
            >
                <Typography color="textPrimary">{name}</Typography>

                <Stack flexDirection={"row"} gap={2}>
                    <Button variant="outlined" color="secondary" onClick={(e) => {e.stopPropagation(); setOpen(true)}}>
                        <span className="material-symbols-outlined">person_add</span>
                    </Button>
                    <Button variant="outlined" color="error" onClick={(e) => {e.stopPropagation(); onDelete()}}>
                        <span className="material-symbols-outlined">delete</span>
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}