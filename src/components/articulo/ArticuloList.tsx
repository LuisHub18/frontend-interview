import {useEffect, useState} from 'react';
import {Articulo} from '../../types.d';
import ArticuloListItem from './ArticuloListItem';
import apiclient from '../../utils/apiclient';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ArticuloFormDialog from './ArticuloFormDialog';
import { ModalType } from '../../types.d';

const ArticuloList = () => {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    
    const handleArticulos = async () => {
        apiclient.articulos.getAll().then((response) => {
            setArticulos(response.data);
        }).catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        handleArticulos();
    }, []);

    return (
        <>
            <ArticuloFormDialog 
                modalType={ModalType.ADD_ARTICULO} 
                onCompleted={handleArticulos}
            />
            
            <br />
            <TableContainer
                sx={{
                    width: '80%',
                    margin: 'auto'
                }}
            >
                <Table>
                    <TableHead
                        sx={{
                            backgroundColor: '#f5f5f5'
                        }}
                    >
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Fecha Creación</TableCell>
                            <TableCell>Modelo</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articulos.map((articulo, index) => (
                            <ArticuloListItem key={articulo.id}  articulo={articulo} numeroArticulos={index} onCompleted={handleArticulos}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ArticuloList;