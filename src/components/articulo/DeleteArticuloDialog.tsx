import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Articulo } from '../../types';
import apiclient from '../../utils/apiclient';
import { Box, IconButton } from '@mui/material';

interface DeleteArticuloDialogProps {
    onCompleted: () => void;
    articulo: Articulo;
}

const DeleteArticuloDialog: React.FC<DeleteArticuloDialogProps> = ({onCompleted, articulo}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
    setOpen(false);
    };

    const handleDelete = (id: number) => {
        apiclient.articulos.delete(id).then(() => {
            onCompleted();
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <Box>
            <IconButton onClick={handleClickOpen} color="error">
                    <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {`Eliminar articulo ${articulo.nombre}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`¿Estás seguro que deseas eliminar el articulo ${articulo.nombre}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => handleDelete(articulo.id)} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default DeleteArticuloDialog;