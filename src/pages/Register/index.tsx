import { useContext, useState } from "react"
import { SessionContext } from "../../providers/SessionContext"
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material"
import { RegisterForm } from "./styles"
import axios, { AxiosError } from "axios"
import { redirect, useNavigate } from "react-router-dom"


export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const registerHandler = async () => {
       axios.post("http://localhost:5000/register", {username, password, email}).then(res => {
        alert(res.data.msg)
        navigate("/")
       }).catch((err: AxiosError) => {
        alert(err.message)
       })
    }

    return (
        <>
            <Stack height={"100vh"} width={"100vw"} alignItems={"center"} justifyContent={"center"}>
                <RegisterForm flexDirection={"column"} alignItems={"center"} justifyContent={"space-between"}>
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
                        <TextField label="Email" type="email" onChange={(e) => setEmail(e.target.value)}></TextField>

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
                        
                        <Button variant="outlined" sx={{marginTop: "20px"}} onClick={registerHandler}>Login</Button>
                    </Stack>

                </RegisterForm>
            </Stack>
        </>
    )
}