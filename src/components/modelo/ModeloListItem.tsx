import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Modelo, ModalType } from "../../types.d";
import ModeloFormDialog from "./ModeloFormDialog.tsx";
import DeleteDialog from "../DeleteDialog.tsx";
import apiclient from "../../utils/apiclient.ts";

interface ModeloListItemProps {
    modelo: Modelo;
    numeroModelos: number;
    onCompleted: () => void;
}

const ModeloListItem: React.FC<ModeloListItemProps> = ({modelo, numeroModelos, onCompleted}) => {
    
    const handleDelete = (id: number) => {
        apiclient.modelos.delete(id).then(() => {
            onCompleted();
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
            <TableRow 
            sx={
                {
                    backgroundColor: numeroModelos%2 === 0 ? 'white' : '#f5f5f5'
                }
            }
            >
                <TableCell>{modelo.id}</TableCell>
                <TableCell>{modelo.nombre}</TableCell>
                <TableCell>{modelo.marca.nombre}</TableCell>
                <TableCell>
                    <ModeloFormDialog modalType={ModalType.EDIT_MODELO} modelo={modelo} onCompleted={onCompleted}/>
                    <DeleteDialog handleDelete={handleDelete} entity={modelo} entityName={'modelo'} />
                </TableCell>
            </TableRow>

    );
}

export default ModeloListItem;