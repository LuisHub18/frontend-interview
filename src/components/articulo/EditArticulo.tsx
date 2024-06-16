import { Articulo } from "../../types.d";
import React, { useCallback, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiclient from "../../utils/apiclient";
import { ArticuloRequest, Marca, Modelo } from "../../types";
import { MenuItem } from "@mui/material";

interface EditArticuloProps {
    isOpen: boolean;
    closeModal: () => void;
    onComplete: () => void;
    articulo: Articulo;
}

const EditArticulo: React.FC<EditArticuloProps> = ({ isOpen, closeModal, onComplete, articulo }) => {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [activo, setActivo] = useState<boolean>(true);
    const [selectedModelo, setSelectedModelo] = useState<number | null>(articulo.modelo.id);
    const [selectedMarca, setSelectedMarca] = useState<number | null>(null);

    const getMarcaByModeloId = useCallback((idModelo: number): number => {
        const modelo = modelos.find((modelo) => modelo.id === idModelo);
        return modelo ? modelo.marca.id : 0;
    }, [modelos]);

    const getMarcas = async () => {
        apiclient.marcas.getAll().then((response) => {
            setMarcas(response.data);
        }).catch((error) => {
            console.error(error);
        })
    };

    const getModelos = async () => {
        apiclient.modelos.getAll().then((response) => {
            setModelos(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    const getModelosByMarca = async (idMarca: number) => {
        apiclient.modelos.getByMarca(idMarca).then((response) => {
            setModelos(response.data);
            setActivo(response.data.length > 0);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getModelos();
        getMarcas();
    }, []);

    useEffect(() => {
        if (marcas.length > 0) {
            setSelectedMarca(getMarcaByModeloId(articulo.modelo.id));
        }
    }, [articulo.modelo.id, getMarcaByModeloId, marcas]);

    const handleMarcaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const idMarca = parseInt(event.target.value);
        getModelosByMarca(idMarca);
        setSelectedMarca(idMarca);
        setSelectedModelo(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const articuloRequest: ArticuloRequest = {
            nombre: formData.get('nombre') as string,
            descripcion: formData.get('descripcion') as string,
            precio: parseFloat(formData.get('precio') as string),
            cantidad: parseInt(formData.get('cantidad') as string),
            modeloId: parseInt(formData.get('modelo') as string)
        };

        apiclient.articulos.update(articulo.id, articuloRequest).then(() => {
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
                    minWidth: '500px', // Ajustar el ancho mínimo
                    maxWidth: '800px', // Ajustar el ancho máximo
                    padding: '20px',
                }
            }}
            maxWidth="lg"
        >
            <DialogTitle className="text-center">EDITAR ARTICULO {articulo.id}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    defaultValue={articulo.nombre}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    id="descripcion"
                    defaultValue={articulo.descripcion}
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
                    name="precio"
                    defaultValue={articulo.precio}
                    label="Precio"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    id="cantidad"
                    defaultValue={articulo.cantidad}
                    name="cantidad"
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
                    value={selectedMarca || ''}
                    name="marca"
                    label="Marca"
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
                    disabled={!activo}
                    value={selectedModelo || ''}
                    onChange={(event) => setSelectedModelo(parseInt(event.target.value))}
                    fullWidth
                    variant="standard"
                >
                    {modelos.length === 0 ? (
                        <MenuItem value={0}>No hay modelos</MenuItem>
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
                <Button disabled={!activo} type="submit">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditArticulo;
