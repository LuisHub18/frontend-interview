import React, {useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiclient from "../../utils/apiclient";
import { ModeloRequest, Marca, Modelo } from "../../types.d";
import { MenuItem } from "@mui/material";

interface EditModelo {
    isOpen: boolean;
    closeModal: () => void;
    onComplete: () => void;
    modelo: Modelo;
}

const EditModelo: React.FC<EditModelo> = ({ isOpen, closeModal, onComplete, modelo }) => {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [selectedMarca, setSelectedMarca] = useState<number | string>('');

    useEffect(() => {
        getMarcas();
    }, []);

    const getMarcas = async () => {
        apiclient.marcas.getAll().then((response) => {
            setMarcas(response.data);
            setSelectedMarca(response.data.length > 0 ? response.data[0].id : '');
        }).catch((error) => {
            console.error(error);
        });
    }   
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const modeloRequest: ModeloRequest = {
            nombre: formData.get('nombre') as string,
            marcaId: parseInt(formData.get('marca') as string)
        };

        apiclient.modelos.update(modelo.id, modeloRequest).then(() => {
            onComplete();
            closeModal();
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
            <DialogTitle className="text-center text-blue-scale-500">EDITAR MODELO</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nombre"
                    defaultValue={modelo.nombre}
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

export default EditModelo;