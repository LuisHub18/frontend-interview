import { TableRow, TableCell } from '@mui/material';
import {Articulo, ModalType} from '../../types.d'
import DeleteArticuloDialog from './DeleteArticuloDialog';
import ArticuloFormDialog from './ArticuloFormDialog';

interface ArticuloListItemProps{
    articulo: Articulo,
    numeroArticulos: number,
    onCompleted: () => Promise<void>;
}

 const ArticuloListItem: React.FC<ArticuloListItemProps> = ({articulo, numeroArticulos, onCompleted}) =>{
    
    return (
        <TableRow 
            sx={
                {
                    backgroundColor: numeroArticulos%2 === 0 ? 'white' : '#f5f5f5'
                }
            }
        >
            <TableCell>{articulo.id}</TableCell>
            <TableCell>{articulo.nombre}</TableCell>
            <TableCell>{articulo.descripcion}</TableCell>
            <TableCell>{articulo.precio}</TableCell>
            <TableCell>{articulo.cantidad}</TableCell>
            <TableCell>{articulo.fechaCreacion}</TableCell>
            <TableCell>{articulo.modelo.id}</TableCell>
            <TableCell>    
                <ArticuloFormDialog modalType={ModalType.EDIT_ARTICULO} articulo={articulo} onCompleted={onCompleted}/>
                <DeleteArticuloDialog 
                    articulo={articulo} 
                    onCompleted={onCompleted}
                />
            </TableCell>
        </TableRow>
    );
 }
 
 export default ArticuloListItem;