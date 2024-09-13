import { useState } from "react"
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material"
import { LoginForm } from "./styles"
import { AxiosError } from "axios"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../api"

interface ILoginResponse {
    access_token: string
}

export default function Login() {
    const navigate = useNavigate();


    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const loginHandler = async () => {
        api.post<ILoginResponse>("/login", {
            username,
            password
        }).then(res => {
            const token = res.data.access_token;

            sessionStorage.setItem("token", token)

            navigate("/home")
        }).catch((e: AxiosError) => {
            alert(e.message)
        })
    }

    return (
        <>
            <Stack height={"100vh"} width={"100vw"} alignItems={"center"} justifyContent={"center"}>
                <LoginForm flexDirection={"column"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box>
                        <Typography variant="h2" textAlign={"center"}>Tasker</Typography>
                        <Typography variant="h5" color="textSecondary" textAlign={"center"}>A place to store your tasks!</Typography>
                    </Box>
                    <Stack
                        width="100%"
                        padding={"20px"}
                        flexDirection={"column"}
                        gap={2}
                    >
                        <hr />

                        <TextField label="Username" onChange={(e) => setUsername(e.target.value)}></TextField>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((show) => !show)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onMouseUp={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? 
                                                <span className="material-symbols-outlined">visibility_off</span> : 
                                                <span className="material-symbols-outlined">visibility</span>
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <Stack flexDirection={"column"} gap={1}>
                            <Link to="/register" style={{alignSelf: "flex-end"}}>
                                <Typography variant="caption" color="info">Register account</Typography>
                            </Link>
                            <Button variant="outlined" onClick={loginHandler}>Login</Button>
                        </Stack>
                    </Stack>

                </LoginForm>
            </Stack>
        </>
    )
}