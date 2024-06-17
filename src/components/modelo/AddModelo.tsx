import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiclient from "../../utils/apiclient";
import { Marca, ModeloRequest } from "../../types.d";
import { MenuItem } from "@mui/material";

interface AddModeloProps {
    isOpen: boolean;
    closeModal: () => void;
    onComplete: () => void;
}

const AddModelo: React.FC<AddModeloProps> = ({ isOpen, closeModal, onComplete }) => {
    const [marcas, setMarcas] = useState<Marca[]>([]); 
    const [selectedMarca, setSelectedMarca] = useState<number | string>('');

    const getMarcas = async () => {
        apiclient.marcas.getAll().then((response) => {
            setMarcas(response.data);
            setSelectedMarca(response.data.length > 0 ? response.data[0].id : '');
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getMarcas();
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const modelo: ModeloRequest = {
            nombre: formData.get('nombre') as string,
            marcaId: parseInt(formData.get('marca') as string),
        };

        apiclient.modelos.create(modelo).then(() => {
            onComplete();
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleMarcaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const idMarca = parseInt(event.target.value);
        setSelectedMarca(idMarca);
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
            <DialogTitle className="text-center text-blue-scale-500">AÑADIR MODELO</DialogTitle>
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
                <TextField
                    required
                    select
                    margin="dense"
                    id="marca"
                    name="marca"
                    label="Marca"
                    value={selectedMarca}
                    fullWidth
                    variant="standard"
                    onChange={handleMarcaChange}
                >
                    {marcas.map((marca) => (
                        <MenuItem key={marca.id} value={marca.id}>
                            {marca.nombre}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Cancelar</Button>
                <Button type="submit" color="success">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddModelo;