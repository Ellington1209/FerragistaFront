import { Box } from "@mui/material";
import React from "react";
import { AvatarAppBar } from "./components";


const Menu = (props) => {
  return (
    <AvatarAppBar>
      <Box  sx={{ padding: 0, margin: 0 }}>
        {props.children}
        
      </Box>
    </AvatarAppBar>
  );
};

export default Menu;