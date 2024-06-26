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
      <AppBar position="static" sx={{ backgroundColor: '#081824' }}> {/* Aquí puedes definir un color personalizado */}
        <Toolbar className='flex justify-between items-center'>
          <Button 
            color="inherit" 
            component={Link} 
            sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
            to='/'>
            CRUD
          </Button>
          <div>
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