import { Autocomplete, Button, Modal, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { api, ITextResponse } from "../../../../api"
import { AxiosError } from "axios"
import { Bounce, toast } from "react-toastify"

interface IAddGroupProps {
    open: boolean
    setOpen: (value: boolean) => void,
    groupId: number
    forceReload: () => void
}

interface IUserResponse {
    username: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddPersonModal({ open, setOpen, groupId, forceReload }: IAddGroupProps) {
    const token = sessionStorage.getItem("token")

    const [name, setName] = useState<string | null>("")
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {

        api.get<IUserResponse[]>(`/users?username=${name}&exclude_group=${groupId}`, { 
            headers: { Authorization: `Bearer ${token}`}
        }).then(res => {
            setUsers(res.data.map(u => u.username))
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
    }, [name, open])

    const handleSubmit = () => {
        api.post("/groups/add", {group_id: groupId, target_user: name}, { 
            headers: { Authorization: `Bearer ${token}`}
        }).then(() => {

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
        setName("")
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">Add Person</Typography>

                    <Stack gap={4} my={3} sx={{minWidth: "400px"}}>
                        <Autocomplete
                            disablePortal
                            options={users}
                            renderInput={(params) => <TextField {...params} label="Username"/>}
                            onInputChange={(e, value) => setName(value)}
                        />
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