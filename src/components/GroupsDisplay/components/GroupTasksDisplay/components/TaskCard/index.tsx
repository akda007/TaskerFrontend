import { Box, Stack, Typography } from "@mui/material"
import { TaskBody } from "./styles"
import Draggable from "react-draggable"
import { useState } from "react"
import { Item, Menu, useContextMenu } from "react-contexify"
import 'react-contexify/ReactContexify.css';
import { MousePosition } from "@react-hook/mouse-position"
import { api, ITextResponse } from "../../../../../../api"
import { AxiosError } from "axios"
import EditModal from "./components/EditModal"
import { Bounce, toast } from "react-toastify"

interface ITaskCardProps {
    id: number,
    description: string,
    status: string,
    title: string,
    mouse: MousePosition
    forceUpdate: () => void
}

export default function TaskCard({id, description, status, title, mouse, forceUpdate}: ITaskCardProps) {
    const { show } = useContextMenu({id: id});
    const token = sessionStorage.getItem("token")

    const [edit, setEdit] = useState(false)

    const handleDelete = () => {
        api.delete(`/tasks/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(() => {
            forceUpdate()            
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

    const handleEdit = () => {
        setEdit(true)
    }

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        show({
            event,
            props: {
                key: id
            },
            position: {
                x: mouse.x ?? 0,
                y: mouse.y ?? 0
            }
        })
    }

    let shadowColor = "";

    switch (status.toLowerCase()){
        case "pending":
            shadowColor = "#f2bd2a28"
            break;
        case "active":
            shadowColor = "#16b22128"
            break;
            case "finished":
            shadowColor = "#4036c528"
            break;
        default:
            shadowColor = "#46464628"
            break;  
    }

    return (
        <>
            <EditModal
                open={edit}
                setOpen={setEdit}
                title={title}
                description={description}
                status={status}
                id={id}
                forceUpdate={forceUpdate}
            />

            <Draggable
                grid={[25, 25]}
                bounds="parent"
            >
                <TaskBody
                    onContextMenu={handleContextMenu}
                    shadowColor={shadowColor}
                >
                    <Box>
                        <Typography variant="h4" sx={{wordWrap: "break-word"}}>{title}</Typography>
                        <Typography  sx={{wordWrap: "break-word"}}>
                        { description.split("\n").map((line, index) => 
                            <span key={index}>
                                {line}
                                <br/>
                            </span>
                        )}
                        </Typography>
                    </Box>
                    <Stack flexDirection={"row"} justifyContent={"flex-end"}>
                        <Typography>Status: {status}</Typography>
                    </Stack>
                    
                </TaskBody>
            </Draggable>

            <Menu id={id} style={{
                position: "absolute",
                zIndex: "999"
            }}>
                <Item id={`${id}-delete`} style={{zIndex: 999}} onClick={handleDelete}>
                    <Typography>Delete</Typography>
                </Item>
                <Item id={`${id}-delete`} style={{zIndex: 999}} onClick={handleEdit}>
                    <Typography>Edit</Typography>
                </Item>
            </Menu>
        </>
    )
}