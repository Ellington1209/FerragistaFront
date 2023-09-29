import { Box, Paper, Typography, Button, Grid, Modal, TextField } from '@mui/material'
import { useState } from 'react';
import { useDispatch } from 'react-redux';


import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { CategoriaService } from '../../../services';
import { changeloading } from '../../../store/actions/loading.action';
import { changeNotify } from "../../../store/actions/notify.actions";
import TabelaCategorias from './TabelaCategorias';









//css do modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const schema = yup.object({
    categoria: yup.string().required().min(3),
  });

  
export default function Categoria() {
  //controlador do modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  //controlador do formulario
  const { register, handleSubmit: onSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });


  const handleSubmit = (data) => {
    dispatch(
      changeloading({
        open: true,
        msg: "Carregando...",
      })
    );
  
    CategoriaService.create(data)
      .then(() => {
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "success",
            msg: "Categoria adicionada com sucesso!",
          })
        );
        window.location.reload();
      })
      .catch((error) => {
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "error",
            msg: "Erro ao cadastrar Categoria!",
          })
        );
      });
  };

  return (
    <Box >
      {/* parte superior da pagina  */}
      <Box component={Paper} elevation={3} padding={2} display="flex" alignItems="center" >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant='h1' fontSize='30px '>Categoria</Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Button onClick={handleOpen} variant="contained" size='large'>Adicionar Categoria</Button>
            {/* modal da parte superior que abre o formulario  */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" >
                  Adicionar nova categoria.
                </Typography>
                {/* Formulario de produtos */}
                <form onSubmit={onSubmit(handleSubmit)}>
                  <Grid container spacing={2} marginTop={2}>

                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        label='Categoria'
                        {...register("categoria")}
                        fullWidth
                      />
                      <Typography variant='subtitle2'>{errors?.categoria?.message}</Typography>
                    </Grid>

                 
                    <Grid item xs={12}>
                      <Button type='submit' variant='contained' fullWidth>Enviar</Button>
                    </Grid>

                  </Grid>
                </form>

              </Box>
            </Modal>

          </Grid>
        </Grid>
      </Box>
      <Box marginTop={20}>
        <TabelaCategorias />
      </Box>
    </Box>
  )
}
