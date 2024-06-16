import { Modelo, ModalType } from '../../types.d';
import {useEffect, useState} from 'react';
import apiclient from '../../utils/apiclient';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ModeloFormDialog from './ModeloFormDialog';
import ModeloListItem from './ModeloListItem';


const ModeloList = () => {
    const [modelos, setModelos] = useState<Modelo[]>([]);
    
    const handleModelos = async () => {
        apiclient.modelos.getAll().then((response) => {
            setModelos(response.data);
        }).catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        handleModelos();
    }, []);

    return (
        <>
           <ModeloFormDialog 
                modalType={ModalType.ADD_MODELO} 
                onCompleted={handleModelos}
            /> 
            <br />
            <TableContainer
                sx={{
                    width: '40%',
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
                            <TableCell>Marca</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {modelos.map((modelo, index) => (
                            <ModeloListItem key={modelo.id} modelo={modelo} numeroModelos={index} onCompleted={handleModelos} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ModeloList;