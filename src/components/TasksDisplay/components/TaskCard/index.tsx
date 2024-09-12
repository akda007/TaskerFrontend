import { Box, Stack, Typography } from "@mui/material"
import { TaskBody } from "./styles"
import Draggable from "react-draggable"
import { useState } from "react"
import { Item, Menu, useContextMenu } from "react-contexify"
import 'react-contexify/ReactContexify.css';

interface ITaskCardProps {
    id: number,
    description: string,
    status: string,
    title: string
}

export default function TaskCard({id, description, status, title}: ITaskCardProps) {
    const { show } = useContextMenu({id: id});

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        show({
            event,
            props: {
                key: id
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
                        <Typography variant="caption">{description}</Typography>
                    </Box>
                    <Stack flexDirection={"row"} justifyContent={"flex-end"}>
                        <Typography variant="caption">Status: {status}</Typography>
                    </Stack>
                    
                    <Menu id={id}>
                        <Item id={`${id}-delete`}>Delete</Item>
                    </Menu>
                </TaskBody>
            </Draggable>
        </>
    )
}