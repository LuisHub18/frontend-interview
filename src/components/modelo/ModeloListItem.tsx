import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Modelo, ModalType } from "../../types.d";
import ModeloFormDialog from "./ModeloFormDialog.tsx";
import DeleteModeloDialog from "./DeleteModeloDialog.tsx";

interface ModeloListItemProps {
    modelo: Modelo;
    numeroModelos: number;
    onCompleted: () => void;
}

const ModeloListItem: React.FC<ModeloListItemProps> = ({modelo, numeroModelos, onCompleted}) => {
   
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
                <TableCell>{modelo.marca.id}</TableCell>
                <TableCell>
                    <ModeloFormDialog modalType={ModalType.EDIT_MODELO} modelo={modelo} onCompleted={onCompleted}/>
                    <DeleteModeloDialog modelo={modelo} onCompleted={onCompleted}/>
                </TableCell>
            </TableRow>

    );
}

export default ModeloListItem;