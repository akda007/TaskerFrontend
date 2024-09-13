import { Button, Stack, TextField, Typography } from "@mui/material"
import {  InfoContainer, MainContentHolder } from "./styles"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../providers/UserContext"
import { useJwt } from "react-jwt"
import axios, { AxiosError } from "axios"
import { api } from "../../api"

export default function UserProfile() {
    const token = sessionStorage.getItem("token");

    const {decodedToken, isExpired} = useJwt(token ?? "")

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
                alert(err.message)
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