import { Box, Paper, Typography, Button, Grid, Modal, TextField, Input, Select, MenuItem, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react';

import * as yup from "yup"

import { Http } from '../../../conf/GlobalConf';
import TabelaProdutos from './TabelaProdutos';
import NoPhptos from '../../../image/NoPhotos.png'
import SimpleMaskMoney from "simple-mask-money";
import { CategoriaService } from '../../../services';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../../store/actions/loading.action';
import { changeNotify } from '../../../store/actions/notify.actions';

const schema = yup.object({
  nome: yup.string().required().min(3),
  descricao: yup.string().required(),
  codigo: yup.string().required(),
  quantidade_estoque: yup.string().required(),
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

  const [categorias, setCategorias] = useState([]);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  //const do formulario de produtos 
  const [imagem, setImagem] = useState(null)
  const [nome, setNome] = useState('');
  const [errors, setErrors] = useState({});
  const [descricao, setDescricao] = useState('');
  const [codigo, setCodigo] = useState('');
  const [quantidade_estoque, setQuantidade_estoque] = useState('');
  const [preco_compra, setPreco_compra] = useState('');
  const [preco_venda, setPreco_venda] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('3');



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





  async function handleSubmit() {
    try {
      
      let enviarForm = new FormData();
      enviarForm.append('imagem', imagem);
      enviarForm.append('nome', nome);
      enviarForm.append('descricao', descricao);
      enviarForm.append('categoria_id', categoriaSelecionada);
      enviarForm.append('codigo', codigo);
      enviarForm.append('quantidade_estoque', quantidade_estoque);
      enviarForm.append('preco_compra', preco_compra);
      enviarForm.append('preco_venda', preco_venda);

      dispatch(
        changeloading({
          open: true,
          msg: 'Carregando...',
        })
      );

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      await schema.validate(
        {
          nome,
          descricao,
          codigo,
          quantidade_estoque,
          preco_compra,
          preco_venda,
        },
        { abortEarly: false }
      );


      await Http.post('/api/produtos', enviarForm, config)
        .then((res) => {
         
          dispatch(changeloading({ open: false }));
          dispatch(
            changeNotify({
              open: true,
              class: 'success',
              msg: res.data.success
            })
          );
          handleClose(); // Feche o modal após o envio 
           window.location.reload();
        })
        .catch((error) => {
         
          dispatch(changeloading({ open: false }));
          dispatch(
            changeNotify({
              open: true,
              class: 'error',
              msg: error.message // Exibe a mensagem de erro retornada pela API
            })
          );
        });
    } catch (error) {
      dispatch(changeloading({ open: false }));
      if (error.inner) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };


  const getCategorias = async () => {
    const res = await CategoriaService.getCategorias();
    if (res) {
      setCategorias(res.categorias.data);
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);



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
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setImagem(file);
                          if (file) {
                            const validExtensions = ['png', 'jpeg', 'jpg'];
                            const extension = file.name.split('.').pop().toLowerCase();
                            if (validExtensions.includes(extension)) {
                              setErrorMessage(null);
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setSelectedImage(event.target.result);
                              };
                              reader.readAsDataURL(file);
                            } else {
                              setErrorMessage('Permitido apenas PNG, JPEG ou JPG.');
                            }
                          }
                        }}
                      />
                    </Box>
                    {errorMessage && (
                      <Typography variant="subtitle2" color="error">
                        {errorMessage}
                      </Typography>
                    )}
                  </Grid>


                  <Grid item xs={9}>
                    {/* começa outro Container */}
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          type='text'
                          variant='outlined'
                          label='Nome'
                          value={nome}
                          onChange={(e) => {
                            setNome(e.target.value);
                            // Limpar o erro quando o usuário começar a digitar novamente
                            setErrors((prevErrors) => ({ ...prevErrors, nome: '' }));
                          }}
                          fullWidth
                        />
                        <Typography variant='subtitle2'>  {errors?.nome}</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <InputLabel id='category'>Selecione a categoria</InputLabel>
                        <Select
                          id='category'
                          label='Categoria'
                          fullWidth
                          value={categoriaSelecionada} // Use categoriaSelecionada aqui
                          onChange={(e) => {
                            setCategoriaSelecionada(e.target.value);
                            setErrors((prevErrors) => ({ ...prevErrors, categoria_id: '' }));
                          }} // Atualize categoriaSelecionada, não categorias
                        >
                          {categorias.map((categoria) => (
                            <MenuItem key={categoria.id} value={categoria.id}>
                              {categoria.categoria}
                            </MenuItem>
                          ))}
                        </Select>
                        <Typography variant='subtitle2'>{errors?.categoria_id}</Typography>
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
                          value={descricao}
                          onChange={(e) => {
                            setDescricao(e.target.value)
                            setErrors((prevErrors) => ({ ...prevErrors, descricao: '' }));
                          }}
                          fullWidth
                        />
                        <Typography variant='subtitle2'>{errors?.descricao}</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <TextField
                          variant='outlined'
                          label='Codigo do Produto'
                          value={codigo}
                          onChange={(e) => {
                            setCodigo(e.target.value)
                            setErrors((prevErrors) => ({ ...prevErrors, codigo: '' }));
                          }}
                          fullWidth
                        />
                        <Typography variant='subtitle2'>{errors?.codigo}</Typography>
                      </Grid>

                      <Grid item xs={8}>
                        <TextField
                          type='number'
                          variant='outlined'
                          label='Quantidade de Estoque'
                          value={quantidade_estoque}
                          onChange={(e) => {
                            setQuantidade_estoque(e.target.value)
                            setErrors((prevErrors) => ({ ...prevErrors, quantidade_estoque: '' }));
                          }}
                          fullWidth
                        />
                        <Typography variant='subtitle2'>{errors?.quantidade_estoque}</Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          variant='outlined'
                          label='Preço de compra'
                          value={preco_compra}
                          onChange={(e) => {
                            let number = mask.formatToMask(e.target.value);
                            setPreco_compra(number); // Correção aqui
                            // Limpar o erro quando o usuário começar a digitar novamente
                            setErrors((prevErrors) => ({ ...prevErrors, preco_compra: '' }));
                          }}
                          fullWidth
                        />
                        <Typography variant='subtitle2'>{errors?.preco_compra}</Typography>
                      </Grid>


                      <Grid item xs={6}>
                        <TextField
                          variant='outlined'
                          label='Preço de venda'
                          value={preco_venda}
                          onChange={(e) => {
                            let number = mask.formatToMask(e.target.value);
                            setPreco_venda(number); // Ajuste aqui
                            // Limpar o erro quando o usuário começar a digitar novamente
                            setErrors((prevErrors) => ({ ...prevErrors, preco_venda: '' }));
                          }}
                          fullWidth
                        />
                        <Typography variant='subtitle2'>{errors?.preco_venda}</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Button type='submit' variant='contained' onClick={handleSubmit} fullWidth>Enviar</Button>
                      </Grid>

                    </Grid>
                  </Grid>

                </Grid>


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
