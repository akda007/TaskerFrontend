import { Box, Stack, Typography } from "@mui/material"
import { TaskBody } from "./styles"
import Draggable from "react-draggable"
import { useRef, useState } from "react"
import { Item, Menu, useContextMenu } from "react-contexify"
import 'react-contexify/ReactContexify.css';
import useMouse, { MousePosition } from "@react-hook/mouse-position"
import { api } from "../../../../api"
import { AxiosError } from "axios"

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

    const handleDelete = () => {
        api.delete(`/tasks/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            forceUpdate()            
        }).catch((err: AxiosError) => {
            alert(err.message)
        })
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

    return (
        <>
            <Draggable
                grid={[25, 25]}
                bounds="parent"
            >
                <TaskBody
                    onContextMenu={handleContextMenu}
                >
                    <Box>
                        <Typography variant="h4">{title}</Typography>
                        <Typography>{description}</Typography>
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
                <Item id={`${id}-delete`} style={{zIndex: 999}}>
                    <Typography>Edit</Typography>
                </Item>
            </Menu>
        </>
    )
}