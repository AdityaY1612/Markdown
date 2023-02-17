
// import styled from "@emotion/styled";
// import { AppBar, createTheme, Toolbar, Typography } from "@mui/material";
// import React from "react";

// const useStyles = createTheme(() => ({
   
//   }));

// export default function Header() {
//     const {header} = useStyles();
//   const displayDesktop = () => {
//     return <Toolbar>{PAR}</Toolbar>;
//   };
  
//   const PAR =(
//     <Typography variant="h6" component="h1">
//         PAR
//     </Typography>
//   );

  

//   return (
//     <header>
//       <AppBar classname={header}>{displayDesktop()}</AppBar>
//     </header>
//   );
// }


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import {borders} from '@mui/system';


const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1,border:10, borderRadius:'16px', borderColor: 'theme.primary.main'}}>
      <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{border:10, borderRadius:'16px', borderColor: 'theme.primary.main'}}>
        <Toolbar>
          <IconButton
            size="x-large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PAR
          </Typography>
          <Button color="inherit">Profile</Button>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </Box>
  );
}