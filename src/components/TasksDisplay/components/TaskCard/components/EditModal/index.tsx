import { Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { api } from "../../../../../../api"
import { AxiosError } from "axios"

interface IEditTaskProps {
    open: boolean
    setOpen: (value: boolean) => void,
    id: number,
    title: string,
    description: string,
    status: string,
    forceUpdate: () => void
}

export default function EditModal({ open, setOpen, title, description, status, id, forceUpdate }: IEditTaskProps) {
    const token = sessionStorage.getItem("token")

    const [_title, setTitle] = useState(title)
    const [_description, setDescription] = useState(description)
    const [_status, setStatus] = useState(status)

    const handleSubmit = () => {
        api.patch(`/tasks/${id}`, {
            title: _title,
            description: _description,
            status: _status
        }, { headers: { Authorization: `Bearer ${token}`}}).then(() => {
            setOpen(false)
            forceUpdate()
        }).catch((err: AxiosError) => {
            alert(err.message)
        })
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="edit-modal-title"
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
                    <Typography id="edit-modal-title" variant="h6" component="h2">Edit Task</Typography>

                    <Stack gap={4} my={3} sx={{minWidth: "400px"}}>
                        <TextField
                            label="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={_title}
                        />

                        <TextField
                            label="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={_description}
                            multiline
                            maxRows={4}
                            rows={4}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="edit-select-label">Status</InputLabel>
                            <Select
                                labelId="edit-select-label"
                                id="edit-select-status"
                                value={_status}
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
                    >Edit</Button>
                </Stack>

            </Modal>
        </>
    )
}