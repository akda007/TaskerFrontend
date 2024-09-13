/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack, TextField, Typography } from "@mui/material"
import {  InfoContainer, MainContentHolder } from "./styles"
import { useEffect, useState } from "react"
import { useJwt } from "react-jwt"
import { AxiosError } from "axios"
import { api, ITextResponse } from "../../api"
import { Bounce, toast } from "react-toastify"

export default function UserProfile() {
    const token = sessionStorage.getItem("token");

    const {decodedToken} = useJwt(token ?? "")

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [enableEdit, setEnableEdit] = useState(false)

    useEffect(() => {
        const data: any = decodedToken;

        if (!data) return;

        setUsername(data.sub)
        setEmail(data.user_email)
    }, [decodedToken])

    console.log(username)

    const handleEditButton = () => {
        if (enableEdit) {
            api.patch("/user", {
                username,
                email
            }, {
                headers: {Authorization: `Bearer ${token}`}
            }).then(res => {
                sessionStorage.setItem("token", res.data.token)

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
            
            setEnableEdit(false)
            return
        } 

        setEnableEdit(value => !value)
    }

    return (
        <>
            <MainContentHolder>
                <InfoContainer flexDirection={"column"} alignContent={"center"}>
                    <Typography variant="h3" textAlign={"center"}>Profile</Typography>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                        <span className="material-symbols-outlined" style={{fontSize: "160px", fontWeight: "50"}}>account_circle</span>
                    </Stack>
                    <Stack gap={5} my={3} mx={5} alignItems={"center"}>
                        <Stack gap={3} width={"100%"}>
                            <TextField
                                label="Username"
                                value={username}
                                defaultValue={username}
                                disabled={!enableEdit}
                                onChange={(e) => {if (enableEdit) setUsername(e.target.value)}}
                            />
                            <TextField
                                label="Email"
                                value={email}
                                defaultValue={email}
                                disabled={!enableEdit}
                                onChange={(e) => {if (enableEdit) setEmail(e.target.value)}}
                            />
                        </Stack>
                        <Button variant="outlined" sx={{
                            maxWidth: "60px"
                        }}
                            onClick={handleEditButton}
                        >
                            {enableEdit ? "Save" : "Edit"}
                        </Button>
                    </Stack>
                </InfoContainer>
            </MainContentHolder>
        </>
    )
}