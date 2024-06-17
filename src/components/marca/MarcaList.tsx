import { Marca, ModalType } from '../../types.d';
import {useEffect, useState} from 'react';
import apiclient from '../../utils/apiclient';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import MarcaFormDialog from './MarcaFormDialog.tsx';
import MarcaListItem from './MarcaListItem.tsx';

const MarcaList = () => {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    
    const handleMarcas = async () => {
        apiclient.marcas.getAll().then((response) => {
            setMarcas(response.data);
        }).catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        handleMarcas();
    }, []);

    return (
        <>
           <MarcaFormDialog 
                modalType={ModalType.ADD_MARCA} 
                onCompleted={handleMarcas}
            /> 
            <br />
            <TableContainer
                sx={{
                    width: '30%',
                    margin: 'auto'
                }}
            >
                <Table>
                    <TableHead
                        sx={{
                            backgroundColor: '#5592c4'
                        }}
                    >
                        <TableRow>
                            <TableCell sx={{color: 'white', fontWeight: 'bold'} }>Id</TableCell>
                            <TableCell sx={{color: 'white', fontWeight: 'bold'} }>Nombre</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {marcas.map((marca, index) => (
                            <MarcaListItem key={marca.id}  marca={marca} numeroMarcas={index} onCompleted={handleMarcas}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default MarcaList;