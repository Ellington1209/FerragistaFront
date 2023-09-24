/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, styled, Collapse,} from "@mui/material";
import { ExpandLess, ExpandMore, Home, Inventory,  } from "@mui/icons-material";
import { indigo } from '@mui/material/colors';




const drawerWidth = 240;

const perfilUsuario = {
  admin: [
    {
      name: "Dashboard",
      icon: Home,
      route: "/dashboard",
      isSubmenu: false,
    },
    {
      name: "Estoque",

      icon: Inventory,
      route: "#",
      isSubmenu: true,
      submenu: [
        {
          name: "Produtos",
          submenuRoute: "/produtos",
        },

        {
          name: "Categorias",
          submenuRoute: "/categoria",
        },
     
      ],
    },
  


  ],
  user: [
    {
      name: "",
      icon: "",
      route: "",
    },
  ],
};

const NewHOC = (PassedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <PassedComponent {...this.props} />
        </div>
      );
    }
  };
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar = (props) => {
  const { open } = props;
  const perfil = "admin";
  const [isExpand, setIsExpand] = React.useState(999);
  const handleClickMenu = (index) => {
    setIsExpand((state) => (index === state ? 999 : index));
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor:indigo[500] 
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <div className="form-group text-center p-3 mt-4 pb-2">
          <img src="" />
        </div>
      </DrawerHeader>
      <Box sx={{ overflow: "auto" }}>
        <List key="list">
          {perfilUsuario[perfil].map((p, index) => {
            const IconComponent = NewHOC(p.icon);

            return (
              <ListItem key={p.name} disablePadding>
                <ListItemButton
                  component="a"
                  href={p.route}
                  onClick={() => handleClickMenu(index)}
                >
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText primary={p.name} />
                  {p.isSubmenu ? (
                    isExpand === index ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    <></>
                  )}
                </ListItemButton>
                {p.isSubmenu &&
                  p.submenu.map((menu) => {
                    return (
                      <Collapse    key={menu.name}

                        in={isExpand === index}
                        timeut="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          <ListItemButton component="a" href={menu.submenuRoute}>
                            <ListItemText primary={menu.name} />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    );
                  })}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;