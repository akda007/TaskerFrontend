import { Stack, Typography } from "@mui/material";
import { AddButton, GroupListContainer, MainContentHolder } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../api";
import { AxiosError } from "axios";
import GroupItem from "./components/GroupItem";

interface IGroupsResponse {
    id: number,
    name: string
}

export default function GroupsDisplay() {
    const [groups, setGroups] = useState<IGroupsResponse[]>([])

    const token = sessionStorage.getItem("token")

    useEffect(() => {
        api.get<IGroupsResponse[]>("/groups", {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            setGroups(res.data)
        }).catch((err: AxiosError) => {
            alert(err.message)
        }) 
    }, [])

    return (
        <>
            
            <MainContentHolder>
                <GroupListContainer flexDirection={"column"} alignContent={"center"}>
                    <Typography variant="h3" textAlign={"center"}>Groups</Typography>

                    <Stack>
                        {groups.map(group => 
                            <GroupItem key={group.id} name={group.name}></GroupItem>
                        )}
                    </Stack>
                    
                    <AddButton variant="outlined" onClick={() => {}}>
                        <span style={{fontSize: "2.5em"}} className="material-symbols-outlined">add</span>
                    </AddButton>
                </GroupListContainer>
            </MainContentHolder>
        </>
    )
}