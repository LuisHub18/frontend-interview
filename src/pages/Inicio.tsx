import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const Inicio = () => {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(to bottom,#113048 ,#eaf1f8)',
                color: 'white',
                textAlign: 'center'
            }}
            className='bg-gradient-to-b from-blue-scale-50 to-blue-scale-500'
        >
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h3" component="h1" className="text-3xl">
                    Tienda | Ferreteria 
                </Typography>
                <Typography variant="h5" component="h2" className="mt-4 text-white">
                    Bienvenido a nuestra plataforma
                </Typography>
            </Box>
            <Container sx={{ marginTop: '50px', marginBottom: '50px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper
                            sx={{
                                padding: '20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <Typography variant="h6" component="h3" className="text-white">
                                Articulos
                            </Typography>
                            <Typography variant="body1" className="text-white">
                                En esta sección podrás ver todos los artículos disponibles en la tienda, así como agregar, editar y eliminar artículos.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper
                            sx={{
                                padding: '20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <Typography variant="h6" component="h3" className="text-white">
                                Modelos
                            </Typography>
                            <Typography variant="body1" className="text-white">
                                En esta sección podrás ver todos los modelos disponibles en la tienda, así como agregar, editar y eliminar modelos.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper
                            sx={{
                                padding: '20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <Typography variant="h6" component="h3" className="text-white">
                                Marcas
                            </Typography>
                            <Typography variant="body1" className="text-white">
                                En esta sección podrás ver todas las marcas disponibles en la tienda, así como agregar, editar y eliminar marcas.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ padding: '20px', marginTop: 'auto' }}>
                <Typography variant="body2" className="text-blue-scale-900">
                    &copy; 2024 Edu. Todos los derechos reservados.
                </Typography>
            </Box>
        </Box>
    );
};

export default Inicio;
