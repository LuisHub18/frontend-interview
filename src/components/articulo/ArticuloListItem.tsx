import { TableRow, TableCell } from '@mui/material';
import {Articulo, ModalType} from '../../types.d'
import ArticuloFormDialog from './ArticuloFormDialog';
import DeleteDialog from '../DeleteDialog';
import apiclient from '../../utils/apiclient';

interface ArticuloListItemProps{
    articulo: Articulo,
    numeroArticulos: number,
    onCompleted: () => Promise<void>;
}

 const ArticuloListItem: React.FC<ArticuloListItemProps> = ({articulo, numeroArticulos, onCompleted}) =>{

    const handleDelete = (id: number) => {
        apiclient.articulos.delete(id).then(() => {
            onCompleted();
        }).catch((error) => {
            console.error(error);
        });
    }
    
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
            <TableCell>{articulo.modelo.nombre}</TableCell>
            <TableCell>    
                <ArticuloFormDialog modalType={ModalType.EDIT_ARTICULO} articulo={articulo} onCompleted={onCompleted}/>
                {/* <DeleteArticuloDialog 
                    articulo={articulo} 
                    onCompleted={onCompleted}
                /> */}
                <DeleteDialog handleDelete={handleDelete} entity={articulo} entityName={'articulo'} />
            </TableCell>
        </TableRow>
    );
 }
 
 export default ArticuloListItem;