import { Stack, Typography } from "@mui/material";
import { AddButton, GroupListContainer, MainContentHolder } from "./styles";
import { useEffect, useReducer, useState } from "react";
import { api } from "../../api";
import axios, { AxiosError } from "axios";
import GroupItem from "./components/GroupItem";
import AddGroupModal from "./components/AddGroupModal";
import GroupTasksDisplay from "./components/GroupTasksDisplay";

interface IGroupsResponse {
    id: number,
    name: string
}

export default function GroupsDisplay() {
    const [update, forceUpdate] = useReducer(x => x + 1, 0);
    const [components, setComponents] = useState<JSX.Element | null>(null)
    const [groups, setGroups] = useState<IGroupsResponse[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [addPersonModal, setAddPersonModal] = useState(false)

    const token = sessionStorage.getItem("token")

    useEffect(() => {
        api.get<IGroupsResponse[]>("/groups", {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            setGroups(res.data)
        }).catch((err: AxiosError) => {
            alert(err.message)
        }) 
    }, [openModal, update])

    const handleGroupClick = (id: number) => {
        setComponents(<GroupTasksDisplay groupId={id}/>)
    }

    const handleGroupDelete = (id: number) => {
        api.delete(`/groups/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            forceUpdate();
        }).catch((err: AxiosError) => {
            alert(err.message)
        })
    }

    return (
        <>
            {(components ?? <>
                <AddGroupModal open={openModal} setOpen={setOpenModal}/>
                <MainContentHolder>
                    <GroupListContainer flexDirection={"column"} alignContent={"center"}>
                        <Typography variant="h3" textAlign={"center"}>Groups</Typography>

                        <Stack gap={2}>
                            {groups.map(group => 
                                <GroupItem
                                    key={group.id}
                                    groupId={group.id}
                                    name={group.name}
                                    onClick={() => handleGroupClick(group.id)}
                                    forceUpdate={forceUpdate}
                                    onDelete={() => handleGroupDelete(group.id)}

                                />
                            )}
                        </Stack>
                        
                        <AddButton variant="outlined" onClick={() => {setOpenModal(true)}}>
                            <span style={{fontSize: "2.5em"}} className="material-symbols-outlined">add</span>
                        </AddButton>
                    </GroupListContainer>
                </MainContentHolder>
            </>) ||
            <>
             {components}
            </>
            }

        </>
    )
}