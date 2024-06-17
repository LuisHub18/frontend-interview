import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Marca, ModalType } from "../../types.d";
import MarcaFormDialog from "./MarcaFormDialog";    
import apiclient from "../../utils/apiclient";
import DeleteDialog from "../DeleteDialog";

interface MarcaListItemProps {
    marca: Marca;
    numeroMarcas: number;
    onCompleted: () => void;
}

const MarcaListItem: React.FC<MarcaListItemProps> = ({marca, numeroMarcas, onCompleted}) => {
    
    const handleDelete = (id: number) => {
        apiclient.marcas.delete(id).then(() => {
            onCompleted();
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
            <TableRow 
            sx={
                {
                    backgroundColor: numeroMarcas%2 === 0 ? 'white' : '#f5f5f5'
                }
            }
            >
                <TableCell>{marca.id}</TableCell>
                <TableCell>{marca.nombre}</TableCell>
                <TableCell>
                    <MarcaFormDialog modalType={ModalType.EDIT_MARCA} marca={marca} onCompleted={onCompleted}/>
                    <DeleteDialog handleDelete={handleDelete} entity={marca} entityName={'marca'} />
                </TableCell>
            </TableRow>

    );
}

export default MarcaListItem;