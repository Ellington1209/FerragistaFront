import React, { useState, useEffect } from "react";
import { Modal, Typography, Box, TableContainer, TextField, Button, Grid } from "@mui/material";



import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import { changeloading } from "../../../store/actions/loading.action";

import { TableComponet } from "../../../components";
import { changeNotify } from "../../../store/actions/notify.actions";
import { CategoriaService } from '../../../services';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


const headers = [
  {
    id: "id",
    label: "Id",
    props: {
      align: 'left',
    },

  },
  {
    id: "categoria",
    label: "Categoria",
    props: {
      align: 'right',
    },
  },

  {
    id: 'actionRows',
    label: 'Ações',
    props: {
      align: 'right',
    },
  },
];

const schema = yup.object({
  categoria: yup.string().required().min(3),
});



export default function TabelaCategorias() {
  const [open, setOpen] = useState(false);


  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const { register, handleSubmit: onSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });


  async function getCategorias() {
    const res = await CategoriaService.getCategorias();
    if (res) {
      setCategorias(res.categorias.data)
      dispatch(
        changeloading({
          open: false,
        })
      );
    }

  }

  const [selectedCategoria, setSelectedCategoria] = useState(null);

  const handleDelete = (data) => {
    
    const idToDelete = data.id;

    dispatch(
      changeloading({
        open: true,
        msg: "Carregando...",
      })
    );

    CategoriaService.DeleteCategorias(idToDelete)
      .then((res) => {
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "success",
            msg: res.message
          })
        );
        getCategorias();
      })
      .catch((error) => {
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "error",
            msg: error.message
          })
        );
      });
    setOpen(false);
    reset();
  };

  const handleUpdateCategoria = () => {

    dispatch(
      changeloading({
        open: true,
        msg: "Carregando...",
      })
    );

    CategoriaService.UpdateCategorias(selectedCategoria.id, selectedCategoria.categoria)
      .then((res) => {
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "success",
            msg: res.message
          })
        );
        getCategorias();
      })
      .catch((error) => {
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "error",
            msg: error.message
          })
        );
      });
    setOpen(false);
    reset();
  };

  const handleEdit = (categoria) => {
    setSelectedCategoria(categoria)

    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        changeloading({
          open: true,
          msg: "Carregando",
        })
      );

      if (mounted) {
        const res = await CategoriaService.getCategorias();

        if (res) {
          setCategorias(res.categorias.data)
          dispatch(
            changeloading({
              open: false,
            })
          );
        }
      }
    };

    fetchData();
    return () => {
      setMounted(false);
    };
  }, [dispatch, mounted]);



  return (
    <>
      <TableContainer>
      
        <TableComponet
          headers={headers}
          data={categorias}
          labelCaption={'nenhuma categoria encontrada!'}
          labelTable={'Categorias'}
          handlerEditarAction={(categoria) => { handleEdit(categoria) }}
          handlerDeletarAction={(categoria) => { handleDelete(categoria) }}
        />
      </TableContainer>
      {selectedCategoria && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Editar Categoria
            </Typography>
            <form onSubmit={onSubmit(handleUpdateCategoria)}>
              <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    {...register("categoria")}
                    value={selectedCategoria.categoria}
                    onChange={(e) => setSelectedCategoria({ ...selectedCategoria, categoria: e.target.value })}
                  />
                  <Box>
                    <Typography variant='subtitle2'>{errors?.categoria?.message}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      )}
    </>
  );
}
