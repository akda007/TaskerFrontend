import { Container } from "@mui/material";
import { AddButton, ContentHolder } from "./styles";
import { useEffect, useReducer, useRef, useState } from "react";
import { api } from "../../api";
import { AxiosError } from "axios";
import TaskCard from "./components/TaskCard";
import AddTask from "./components/AddTask";
import useMouse from "@react-hook/mouse-position";

interface ITaskResponse {
    id: number,
    description: string,
    status: string,
    title: string
}

export default function TaskDisplay() {
    const [update, forceUpdate] = useReducer(x => x + 1, 0);
    const token = sessionStorage.getItem("token")

    const ref = useRef(null);
    const mouse = useMouse(ref, {
        enterDelay: 100,
        leaveDelay: 100
    })

    const [tasks, setTasks] = useState<ITaskResponse[]>([])
    const [showAdd, setShowAdd] = useState(false)

    useEffect(() => {
        api.get<ITaskResponse[]>( "/tasks", {
                headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            setTasks(res.data)
        }).catch((err: AxiosError) => {
            alert(err.message)
        })

    }, [showAdd, update])

    return (
        <>
            <AddTask open={showAdd} setOpen={setShowAdd}/>
            <Container sx={{
                height: "100vh",
                overflow: "auto",
                padding: "80px 50px 50px 50px"
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
            </Container>
        </>
    )
}