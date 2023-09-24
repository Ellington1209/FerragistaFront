import { Box } from "@mui/material";
import { TableComponet } from "../../../components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeloading } from "../../../store/actions/loading.action";
import { CategoriaService } from "../../../services";





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
];

export default function TabelaCategorias() {
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);

    function createData(id, categoria, created_at, updated_at) {
        return { id, categoria, created_at, updated_at };
    }

    let mounted = true;

    useEffect(() => {
        let newRows = [];

        async function getEvento() {
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
                    res.categorias.forEach((row) => {

                        newRows.push(
                            createData(
                                row.id,
                                row.categoria,
                                row.created_at,                               
                                row.updated_at,                             
                            )
                        );
                    });
                    setRows(newRows);
                }
            }
        }

       
    
        getEvento();
        return () => (mounted = false);
    }, []);


    return (
       
            <TableComponet headers={headers} rows={rows} />
        
    );
}
