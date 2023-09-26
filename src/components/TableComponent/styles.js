import { grey } from '@mui/material/colors';
import styled from 'styled-components'

export const Container = styled.div`
  .MuiTableContainer-root {
    box-shadow: none;
    
  }
.MuiTableCell-root{
 
  font-size:  20px !important;
}
.MuiTablePagination-selectLabel {
  color: ${grey[800]};
}
.MuiTablePagination-menuItem{
  color: black
}
.MuiTablePagination-displayedRows {
  color: ${grey[800]};
}

 
  table tbody tr td {
    font-size: 16px !important;
    
  }
`;