import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Box sx={{ 
      component: 'nav',
      flexGrow: 1, 
      }}
      >
      <AppBar position="static">
        <Toolbar className='flex justify-between items-center'>
          <h1 className='text-xl font-bold'>CRUD Tienda</h1>
          <div>
            <Button color="inherit" component={Link} to='/'>Inicio</Button>
            <Button color="inherit" component={Link} to='/articulo'>Articulos</Button>
            <Button color="inherit" component={Link} to='/modelo'>Modelos</Button>
            <Button color="inherit" component={Link} to='/marca'>Marcas</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;