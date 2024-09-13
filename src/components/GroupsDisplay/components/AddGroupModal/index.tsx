import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { api } from "../../../../api"
import { AxiosError } from "axios"

interface IAddGroupProps {
    open: boolean
    setOpen: (value: boolean) => void
}

export default function AddGroupModal({ open, setOpen }: IAddGroupProps) {
    const token = sessionStorage.getItem("token")

    const [name, setName] = useState("")

    const handleSubmit = () => {
        api.post("/groups", { name}, { 
            headers: { Authorization: `Bearer ${token}`}
        }).then(res => {
            setOpen(false)
        }).catch((err: AxiosError) => {
            alert(err.message)
        })
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Stack
                    alignItems={"center"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    sx={{
                        backgroundColor: "white",
                        padding: "35px",
                        borderRadius: "20px"
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">Create Group</Typography>

                    <Stack gap={4} my={3} sx={{minWidth: "400px"}}>
                        <TextField label="Name" onChange={(e) => setName(e.target.value)}></TextField>
                    </Stack>

                    <Button
                        sx={{alignSelf: "flex-end"}}
                        variant="outlined"
                        onClick={handleSubmit}
                    >Add</Button>
                </Stack>

            </Modal>
        </>
    )
}