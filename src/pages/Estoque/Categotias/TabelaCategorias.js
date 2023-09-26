import React, { useState, useEffect } from "react";
import { IconButton, Modal, Typography, Box, TableContainer, TextField, Button, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


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
    },
    {
        id: "categoria",
        label: "Categoria",
    },
    {
        id: "created_at",
        label: "Created_at",
    },
    {
        id: "updated_at",
        label: "Updated_at",
    },
    {
        id: "acoes",
        label: "Ações",
    },
];

const schema = yup.object({
    categoria: yup.string().required().min(3),
});

function createData(id, categoria, created_at, updated_at) {
    return { id, categoria, created_at, updated_at };
}

export default function TabelaCategorias() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [mounted, setMounted] = useState(true);
    
    const { register, handleSubmit: onSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
    
    const handleDelete = () => {
        alert("deletar carai?");
    };
    
    const [selectedCategoria, setSelectedCategoria] = useState(null);

    const handleSubmit = () => {
        
        dispatch(
            changeloading({
              open: true,
              msg: "Carregando...",
            })
          );
        
          CategoriaService.UpdateCategorias(selectedCategoria.id, selectedCategoria.categoria)
            .then(() => {
              dispatch(changeloading({ open: false }));
              dispatch(
                changeNotify({
                  open: true,
                  class: "success",
                  msg: "Categoria alterada com sucesso!",
                })
              );
            })
            .catch((error) => {
              dispatch(changeloading({ open: false }));
              dispatch(
                changeNotify({
                  open: true,
                  class: "error",
                  msg: "Erro ao alterar Categoria!",
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
                    dispatch(
                        changeloading({
                            open: false,
                        })
                    );
                    const newRows = res.categorias.data.map((row) =>
                        createData(
                            row.id,
                            row.categoria,
                            row.created_at,
                            row.updated_at
                        )
                    );
                    setRows(newRows);
                }
            }
        };

        fetchData();
        return () => {
            setMounted(false);
        };
    }, [dispatch, mounted]);

    const rowsWithActions = rows.map((row) => ({
        ...row,
        acoes: (
            <div>
                <IconButton onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleEdit(row)}>
                    <EditIcon />
                </IconButton>
            </div>
        ),
    }));

    return (
        <>
            <TableContainer>
                <TableComponet headers={headers} rows={rowsWithActions} />
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
                        <form onSubmit={onSubmit(handleSubmit)}>
                            <Grid container spacing={2} marginTop={2}>
                                <Grid item xs={12}>                            
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        {...register("categoria")}
                                        value={selectedCategoria.categoria }
                                        onChange={(e) => setSelectedCategoria({ ...selectedCategoria, categoria: e.target.value })}
                                    />
                                     <Typography variant='subtitle2'>{errors?.categoria?.message}</Typography>
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
