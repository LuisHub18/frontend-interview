import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Marca } from '../../types';
import apiclient from '../../utils/apiclient';
import { Box, IconButton } from '@mui/material';

interface DeleteMarcaDialogProps {
    onCompleted: () => void;
    marca: Marca;
}

const DeleteMarcaDialog: React.FC<DeleteMarcaDialogProps> = ({onCompleted, marca}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
    setOpen(false);
    };

    const handleDelete = (id: number) => {
        apiclient.marcas.delete(id).then(() => {
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
                    {`Eliminar marca ${marca.nombre}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`¿Estás seguro que deseas eliminar el marca ${marca.nombre}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => handleDelete(marca.id)} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default DeleteMarcaDialog;