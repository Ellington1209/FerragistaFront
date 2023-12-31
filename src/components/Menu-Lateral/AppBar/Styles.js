import styled, { css } from 'styled-components';
import { indigo, grey } from '@mui/material/colors';

export const Container = styled.div`
  display: flex;
  header {
    background-color:${indigo[500]};
  }

.name{
  
  padding-left: 15px;
 ;
}
  //SIDER BAR STYLES
  ${({ theme }) => css`

    .MuiDrawer-paper svg, .MuiDrawer-paper {
      color: #FFF;
      font-size: 22px;
     
    }
  
    .MuiButtonBase-root:hover{
      color: ${grey[100]}
    }


    .MuiTypography-body1 {
      font-size: 19px;
      color: #fff;
    }

    .MuiListItemIcon-root {
      min-width: 32px;
      margin-left: 15px;
      
    }
    .MuiList-root li {
      display: flex;
      flex-direction: column;
     

    }
    .MuiCollapse-root .muiListItemText-root{
      padding-left:31px;
    }
    .MuiList-root li a, .MuiListItemButton-root, .MuiCollapse-root {
      width: 100%;
    }
    .MuiCollapse-root .MuiListItemText-root {
      padding-left: 31px;
    }
  `}
`;

export const BoxAvatar = styled.div`
  display:  flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;