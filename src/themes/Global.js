import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Classe para remover bordas */
* {
    border: none !important;
    outline: none !important; /* Isso remove a borda de foco também */
  }
`;

export default GlobalStyles;
