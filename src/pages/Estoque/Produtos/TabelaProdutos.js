import * as React from 'react';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableComponet } from '../../../components';
import { ProdutosService } from '../../../services';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../../store/actions/loading.action';


const headers = [
  {
    id: "nome",
    label: "Produto",
    props: {
      align: 'left',
    },

  },
  {
    id: "descricao",
    label: "Descrição",
    props: {
      align: 'right',
    },
  },

  {
    id: 'codigo',
    label: 'Codigo do Produto',
    props: {
      align: 'right',
    },
  },
  {
    id: 'preco_compra',
    label: 'Preço de Compra',
    props: {
      align: 'right',
    },
  },
  {
    id: 'preco_venda',
    label: 'Preço de Venda',
    props: {
      align: 'right',
    },
  },
  {
    id: 'quantidade_estoque',
    label: 'Qd de Estoque',
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


export default function TabelaProdutos() {
  const [produtos, setProdutos] = useState([])
  const [mounted, setMounted] = useState(true);
  const dispatch = useDispatch();


  async function getProdutos(){
    const res = await ProdutosService.getProdutos();
   
    if(res){
      setProdutos(res.produtos.data)
    }
  }
  
  React.useEffect(() => {
    const fetchData = async () => {
      dispatch(
        changeloading({
          open: true,
          msg: "Carregando",
        })
      );

      if (mounted) {
        const res = await ProdutosService.getProdutos();

        if (res) {
          setProdutos(res.produtos.data)
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

  const handleEdit = (data) =>{
    alert('editar saporra!'+ data)
  }
  const handleDelete = (data) =>{
    alert('editar saporra!'+ data)
  }



  return (
    <TableContainer component={Paper}>
     <TableComponet
        headers={headers}
        data={produtos}
        labelCaption={'Nenhum produto encontrado!!'}
        labelTable={'Produtos'}
        handlerEditarAction={(data) => { handleEdit(data) }}
        handlerDeletarAction={(data) => { handleDelete(data) }}
     />
    </TableContainer>
  );
}