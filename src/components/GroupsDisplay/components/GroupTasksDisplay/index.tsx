import { Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AddButton, ContentHolder } from "./styles";
import { useEffect, useReducer, useRef, useState } from "react";
import { api, ITextResponse } from "../../../../api";
import { AxiosError } from "axios";
import TaskCard from "./components/TaskCard";
import AddTask from "./components/AddTask";
import useMouse from "@react-hook/mouse-position";
import { Bounce, toast } from "react-toastify";

interface ITaskResponse {
    id: number,
    description: string,
    status: string,
    title: string
}

interface IGroupsTaskDisplayProps {
    groupId: number
}

export default function GroupTasksDisplay({groupId}: IGroupsTaskDisplayProps) {
    const [update, forceUpdate] = useReducer(x => x + 1, 0);
    const token = sessionStorage.getItem("token")

    const ref = useRef(null);
    const mouse = useMouse(ref, {
        enterDelay: 100,
        leaveDelay: 100
    })

    const [tasks, setTasks] = useState<ITaskResponse[]>([])
    const [showAdd, setShowAdd] = useState(false)
    const [status, setStatus] = useState("")

    useEffect(() => {
        api.get<ITaskResponse[]>( `/groups/${groupId}/tasks?status=${status}`, {
                headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            setTasks(res.data)
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

    }, [showAdd, update, status])

    return (
        <>
            <AddTask open={showAdd} groupId={groupId} setOpen={setShowAdd}/>
            <Container sx={{
                height: "100vh",
                overflow: "auto",
                padding: "80px 50px 50px 50px",
                position: 'relative'
            }}>
                <ContentHolder position="relative" ref={ref}>
                    {tasks.map((task, index) =>
                        <TaskCard
                            key={index}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            status={task.status}
                            mouse={mouse}
                            forceUpdate={forceUpdate}
                        />
                    )}
                </ContentHolder>
                <AddButton variant="outlined" onClick={() => setShowAdd(true)}>
                    <span style={{fontSize: "2.5em"}} className="material-symbols-outlined">add</span>
                </AddButton>
                <FormControl fullWidth sx={{
                    position: "absolute",
                    top: "2%",
                    left: "2%",
                    width: "60%",
                    maxWidth: "300px"
                }}>
                    <InputLabel id="filter-label">Status</InputLabel>
                    <Select
                        labelId="filter-label"
                        id="filter-status"
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                        color="primary"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="finished">Finished</MenuItem>
                    </Select>
                </FormControl>
            </Container>
        </>
    )
}