import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface ExitoDialogProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

const ExitoDialog: React.FC<ExitoDialogProps> = ({ open, onClose, message }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    padding: '20px',
                }
            }}
        >
            <DialogTitle className="text-center">Operación Exitosa</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ExitoDialog;