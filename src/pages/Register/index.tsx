import { useState } from "react"
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material"
import { RegisterForm } from "./styles"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { api, ITextResponse } from "../../api"
import { Bounce, toast } from "react-toastify"


export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const registerHandler = async () => {
       api.post("http://localhost:5000/register", {username, password, email}).then(() => {
        navigate("/")
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