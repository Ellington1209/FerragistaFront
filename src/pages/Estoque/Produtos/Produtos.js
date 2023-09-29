import { Box, Paper, Typography, Button, Grid, Modal, TextField, Input } from '@mui/material'
import { useState } from 'react';

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import TabelaProdutos from './TabelaProdutos';
import NoPhptos from '../../../image/NoPhotos.png'
import SimpleMaskMoney from "simple-mask-money";

const schema = yup.object({
  nome: yup.string().required().min(3),
  descricao: yup.string().required(),
  codigo_produto: yup.string().required(),
  preco_compra: yup.string().required(),
  preco_venda: yup.string().required(),
});

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue } = useForm({ resolver: yupResolver(schema) });

  const mask = SimpleMaskMoney

  mask.args = {
    allowNegative: false,
    negativeSignAfter: false,
    prefix: '',
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.'
  };


  const handleImageChange = (event) => {
    // Quando o usuário selecionar uma nova imagem, armazene-a no estado selectedImage
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <Box>
      <Box component={Paper} elevation={3} padding={2} display="flex" alignItems="center">
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant='h1' fontSize='30px'>Produtos</Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Button onClick={handleOpen} variant="contained" size='large'>Adicionar Produto</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2">
                  Adicionar novo produto.
                </Typography>
                <form onSubmit={onSubmit(handleSubmit)}>
                  <Grid container spacing={2} marginTop={2}>

                    <Grid item xs={3}>
                      <Box component={Paper} elevation={3}
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '& > img': {
                            maxWidth: '100%',
                            maxHeight: '100%',
                          },
                        }}
                         onClick={() => document.getElementById('imageInput').click()} // Ao clicar na imagem, clique no campo de entrada de arquivo
                         style={{ cursor: 'pointer' }}
                     >
                        <img
                         src={selectedImage || NoPhptos}
                          alt="Imagem do Produto"
                        />
                        <Input
                          type='file'
                          id='imageInput'
                          sx={{ display: 'none' }}
                          {...register("image")}
                          onChange={handleImageChange}
                        />

                      </Box>
                    </Grid>


                    <Grid item xs={9}>
                      {/* começa outro Container */}
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            variant='outlined'
                            label='Nome'
                            {...register("nome")}
                            fullWidth
                          />
                          <Typography variant='subtitle2'>{errors?.nome?.message}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            variant='outlined'
                            label='Codigo do Produto'
                            {...register("codigo_produto")}
                            fullWidth
                          />
                          <Typography variant='subtitle2'>{errors?.codigo_produto?.message}</Typography>
                        </Grid>

                      </Grid>
                    </Grid>
                    {/* termina o container */}

                    {/* começa outro container */}

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            multiline
                            variant='outlined'
                            label='Descrição'
                            {...register("descricao")}
                            fullWidth
                          />
                          <Typography variant='subtitle2'>{errors?.descricao?.message}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            variant='outlined'
                            label='Preço de compra'
                            {...register("preco_compra")}
                            onChange={(e)=> {
                              let number = mask.formatToMask(e.target.value)
                              setValue('preco_compra',number )
                            }}
                            fullWidth
                          />
                          <Typography variant='subtitle2'>{errors?.preco_compra?.message}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            variant='outlined'
                            label='Preço de venda'
                            {...register("preco_venda")}                            
                            onChange={(e)=> {
                              let number = mask.formatToMask(e.target.value)
                              setValue('preco_venda',number )
                            }}
                            fullWidth
                          />
                          <Typography variant='subtitle2'>{errors?.preco_venda?.message}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Button type='submit' variant='contained' fullWidth>Enviar</Button>
                        </Grid>

                      </Grid>
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
