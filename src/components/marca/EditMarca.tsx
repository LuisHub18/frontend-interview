import React from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiclient from "../../utils/apiclient";
import { Marca, MarcaRequest } from "../../types.d";

interface EditModelo {
    isOpen: boolean;
    closeModal: () => void;
    onComplete: () => void;
    marca: Marca;
}

const EditMarca: React.FC<EditModelo> = ({ isOpen, closeModal, onComplete, marca }) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const marcaRequest: MarcaRequest = {
            nombre: formData.get('nombre') as string,
        };

        apiclient.marcas.update(marca.id, marcaRequest).then(() => {
            onComplete();
            closeModal();
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
            <DialogTitle className="text-center">EDITAR MARCA</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nombre"
                    defaultValue={marca.nombre}
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

export default EditMarca;