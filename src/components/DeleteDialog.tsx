import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modelo, Marca, Articulo } from '../types.d';
import { Box, IconButton } from '@mui/material';

interface DeleteDialogProps {
    handleDelete: (id: number) => void;
    entity: Modelo | Marca | Articulo;
    entityName: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({handleDelete, entity, entityName}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        handleDelete(entity.id);
        setOpen(false);
    };

    return (
        <Box>
            <IconButton onClick={handleClickOpen} color="error">
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {`Eliminar ${entityName} ${entity.nombre}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`¿Estás seguro que deseas eliminar el ${entityName}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DeleteDialog;