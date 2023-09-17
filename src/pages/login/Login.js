
import {  useDispatch } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material'
// react hook form
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


import Logo from "../../image/logomarca.png"
import { login } from '../../store/actions/auth.actions';
import { changeNotify } from "../../store/actions/notify.actions";

const schema = yup
  .object({
    username: yup.string().email().required(),
    password: yup.string().required().min(5),
  })

export default function Login() {

    const { register, handleSubmit: onSubmit,  formState: { errors }, } = useForm({resolver:yupResolver(schema)});
    const navigate = useNavigate();

    const dispatch = useDispatch();
    //função que faz o login, pega de action.auth a função login e recebe as credenciais.
    const handleSubmit = (credentials) => {
        dispatch(login(credentials))
        .then(()=>{
           
            navigate("/dashboard")// Redirecionando o usuário para a rota /dashboard usando navigate
            dispatch(changeNotify({
                open: true,
                class: "success",
                msg: "Seja Bem Vindo!"
            }))
        })  
    }



    return (
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'
            sx={{ background: 'linear-gradient(to bottom, gray, black)', }}>
            <Card>
                <CardContent sx={{ backgroundColor: '' }}>
                    <Box display='flex' flexDirection='column' gap={2} width={400} height={480} alignItems='center' >
                        <CardMedia
                            component="img"
                            height={150}
                            image={Logo}
                            alt="logo"
                            sx={{ marginLeft: "40px" }}

                        />
                        <form onSubmit={onSubmit(handleSubmit)}>
                            <Box display="flex" flexDirection="column" width={300}>
                                <Box marginTop="20px">
                                    <TextField
                                        label="Email"
                                        type="email"                                      
                                        fullWidth
                                        {...register("username")}
                                        autoComplete='email'
                                    />
                                     <Typography color='red'>{errors?.username?.message}</Typography>
                                </Box>

                                <Box marginTop="20px">
                                    <TextField
                                        label="Senha"
                                        type="password"                                       
                                        fullWidth
                                        {...register("password")}
                                    />
                                    <Typography color='red'>{errors?.password?.message}</Typography>
                                </Box>
                                <Box marginTop="20px">
                                    <Button type='submit' variant='contained' fullWidth>Enviar</Button>
                                </Box>

                            </Box>
                        </form>
                    </Box>
                </CardContent>
            </Card>

        </Box>
    )

}