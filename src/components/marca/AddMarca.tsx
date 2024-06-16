import React from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiclient from "../../utils/apiclient";
import { MarcaRequest } from "../../types";

interface AddMarcaProps {
    isOpen: boolean;
    closeModal: () => void;
    onComplete: () => void;
}

const AddMarca: React.FC<AddMarcaProps> = ({ isOpen, closeModal, onComplete }) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const marca: MarcaRequest = {
            nombre: formData.get('nombre') as string,
        };

        apiclient.marcas.create(marca).then(() => {
            onComplete();
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
                sx: {
                    minWidth: '500px', 
                    maxWidth: '800px',
                    padding: '20px',
                }
            }}
            maxWidth="lg"
        >
            <DialogTitle className="text-center">AÑADIR MARCA</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMarca;