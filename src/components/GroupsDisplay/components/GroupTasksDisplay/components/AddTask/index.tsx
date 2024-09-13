import { Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { api, ITextResponse } from "../../../../../../api"
import { AxiosError } from "axios"
import { Bounce, toast } from "react-toastify"

interface IAddTaskProps {
    open: boolean,
    groupId: number,
    setOpen: (value: boolean) => void
}

export default function AddTask({ open, setOpen, groupId }: IAddTaskProps) {
    const token = sessionStorage.getItem("token")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")

    const handleSubmit = () => {
        api.post(`/groups/${groupId}/tasks`, {
            title,
            description,
            status
        }, { headers: { Authorization: `Bearer ${token}`}}).then(() => {
            setOpen(false)
        }).catch((err: AxiosError) => {
            const data = err.response?.data as ITextResponse;

            toast.error(
                data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            })
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

                    <Stack gap={4} my={3} sx={{minWidth: "400px"}}>
                        <TextField label="Title" onChange={(e) => setTitle(e.target.value)}></TextField>
                        <TextField
                            label="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            multiline
                            maxRows={4}
                            rows={4}
                        />

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