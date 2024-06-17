import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiclient from "../../utils/apiclient";
import { ArticuloRequest, Marca, Modelo } from "../../types";
import { InputAdornment, MenuItem } from "@mui/material";

interface AddArticuloProps {
    isOpen: boolean;
    closeModal: () => void;
    onComplete: () => void;
}

const AddArticulo: React.FC<AddArticuloProps> = ({ isOpen, closeModal, onComplete }) => {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [activoMarca, setMarcaActivo] = useState<boolean>(true);
    const [activoModelo, setModeloActivo] = useState<boolean>(true);
    const [selectedMarca, setSelectedMarca] = useState<number | string>('');
    const [selectedModelo, setSelectedModelo] = useState<number | string>('');

    const getMarcas = async () => {
        apiclient.marcas.getAll().then((response) => {
            setMarcas(response.data);
            setMarcaActivo(response.data.length > 0)
        }).catch((error) => {
            console.error(error);
        });
    }

    const getModelosByMarca = async (idMarca: number) => {
        apiclient.modelos.getByMarca(idMarca).then((response) => {
            setModelos(response.data);
            setSelectedModelo(response.data.length > 0 ? response.data[0].id : '');
            setModeloActivo(response.data.length > 0);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getMarcas();
    }, []);

    useEffect(() => {
        if (selectedMarca !== '') {
            getModelosByMarca(Number(selectedMarca));
        }
    }, [selectedMarca]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const articulo: ArticuloRequest = {
            nombre: formData.get('nombre') as string,
            descripcion: formData.get('descripcion') as string,
            precio: parseFloat(formData.get('precio') as string),
            cantidad: parseInt(formData.get('cantidad') as string),
            modeloId: parseInt(formData.get('modelo') as string),
        };

        apiclient.articulos.create(articulo).then(() => {
            onComplete();
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleMarcaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const idMarca = parseInt(event.target.value);
        setSelectedMarca(idMarca);
    };

    const handleModeloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const idModelo = parseInt(event.target.value);
        setSelectedModelo(idModelo);
    }

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
            <DialogTitle className="text-center text-blue-scale-500">AÑADIR ARTICULO</DialogTitle>
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
                    margin="dense"
                    id="descripcion"
                    name="descripcion"
                    label="Descripción"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    id="precio"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    name="precio"
                    label="Precio"
                    inputProps={{ step: "0.01", min: "0" }}
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    id="cantidad"
                    name="cantidad"
                    inputProps={{ min: "0" }}
                    label="Cantidad"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    select
                    margin="dense"
                    id="marca"
                    name="marca"
                    disabled={!activoMarca}
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
                <TextField
                    required
                    select
                    margin="dense"
                    id="modelo"
                    name="modelo"
                    label="Modelo"
                    value={selectedModelo}
                    fullWidth
                    variant="standard"
                    disabled={!selectedMarca || !activoModelo}
                    onChange={handleModeloChange}
                >
                    {modelos.length === 0 ? (
                        <MenuItem value="">No hay modelos</MenuItem>
                    ) : (
                        modelos.map((modelo) => (
                            <MenuItem key={modelo.id} value={modelo.id}>
                                {modelo.nombre}
                            </MenuItem>
                        ))
                    )}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Cancelar</Button>
                <Button disabled={!selectedMarca || !activoModelo} type="submit" color="success">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddArticulo;