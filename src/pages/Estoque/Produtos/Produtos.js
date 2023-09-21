import { Box, Paper, Typography, Button, Grid, Modal, TextField } from '@mui/material'
import { useState } from 'react';


import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import TabelaProdutos from './TabelaProdutos';







const schema = yup.object({
  nome: yup.string().required().min(3),
  descricao: yup.string().required(),
  codigo_produto: yup.string().required(),
  preco_compra: yup.string().required(),
  preco_venda: yup.string().required(),

});


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

export default function Produtos() {
  //controlador do modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //controlador do formulario
  const { register, handleSubmit: onSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });


  const handleSubmit = (data) => {

    console.log(data)
  }


  return (
    <Box >
      {/* parte superior da pagina  */}
      <Box component={Paper} elevation={3} padding={2} display="flex" alignItems="center" >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant='h1' fontSize='30px '>Produtos</Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Button onClick={handleOpen} variant="contained" size='large'>Adicionar Produto</Button>
            {/* modal da parte superior que abre o formulario  */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" >
                  Adicionar novo produto.
                </Typography>
                {/* Formulario de produtos */}
                <form onSubmit={onSubmit(handleSubmit)}>
                  <Grid container spacing={2} marginTop={2}>

                    <Grid item xs={5}>
                      <TextField
                        variant='outlined'
                        label='Nome'
                        {...register("nome")}
                        fullWidth
                      />
                      <Typography variant='subtitle2'>{errors?.nome?.message}</Typography>
                    </Grid>

                    <Grid item xs={7}>
                      <TextField
                        multiline
                        variant='outlined'
                        label='Descrição'
                        {...register("descricao")}
                        fullWidth
                      />
                      <Typography variant='subtitle2' > {errors?.descricao?.message}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        variant='outlined'
                        label='Codigo do Produto'
                        {...register("codigo_produto")}
                        fullWidth
                      />
                      <Typography variant='subtitle2' > {errors?.codigo_produto?.message}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        variant='outlined'
                        label='Preço de compra'
                        {...register("preco_compra")}
                        fullWidth

                      />
                      <Typography variant='subtitle2' > {errors?.preco_compra?.message}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        variant='outlined'
                        label='Preço de venda'
                        {...register("preco_venda")}
                        fullWidth
                      />
                      <Typography variant='subtitle2' >{errors?.preco_venda?.message}</Typography>
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
        <TabelaProdutos />
      </Box>
    </Box>
  )
}
