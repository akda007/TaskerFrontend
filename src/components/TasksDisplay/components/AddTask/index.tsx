import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { api } from "../../../../api"
import { AxiosError } from "axios"

interface IAddTaskProps {
    open: boolean
    setOpen: (value: boolean) => void
}

export default function AddTask({ open, setOpen }: IAddTaskProps) {
    const token = sessionStorage.getItem("token")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")

    const handleSubmit = () => {
        api.post("/tasks", {
            title,
            description,
            status
        }, { headers: { Authorization: `Bearer ${token}`}}).then(res => {
            alert(res.data.message)

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
                    <Typography id="modal-modal-title" variant="h6" component="h2">Create Task</Typography>

                    <Stack gap={4} my={3}>
                        <TextField label="Title" onChange={(e) => setTitle(e.target.value)}></TextField>
                        <TextField label="Description" onChange={(e) => setDescription(e.target.value)}></TextField>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Status</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select-status"
                                value={status}
                                label="Status"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="finished">Finished</MenuItem>
                            </Select>
                        </FormControl>
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