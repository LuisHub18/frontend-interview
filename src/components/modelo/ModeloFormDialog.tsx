import React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Modelo, ModalType } from '../../types.d';
import { IconButton } from '@mui/material';
import ExitoDialog from '../SuccessDialog.tsx';
import AddModelo from './AddModelo.tsx';
import EditModelo from './EditModelo.tsx';

interface ModeloFormDialogProps {
    modalType: ModalType;
    onCompleted: () => void;
    modelo ?: Modelo;
}

const ModeloFormDialog: React.FC<ModeloFormDialogProps> = ({modalType, onCompleted, modelo}) => {
  const [open, setOpen] = useState(false);
  const [showExito, setShowExito] = useState<boolean>(false);

  const handleCloseExito = () => {
      setShowExito(false);
  }

  const handleOpenExito = () => {
      setShowExito(true);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      modalType === ModalType.ADD_MODELO ? 
      <div className='text-center'>
          <Button variant='outlined' onClick={handleClickOpen}  sx={{color: '#225f91'}}>Añadir modelo</Button>
          <AddModelo isOpen={open} closeModal={handleClose} onComplete={
                () => {
                    handleClose();
                    handleOpenExito();
                    onCompleted();
                }
          }/>  
          <ExitoDialog open={showExito} onClose={handleCloseExito} message="Modelo añadido exitosamente"/>
      </div>
  : 
      modelo 
      &&
      <div>
         <IconButton 
            onClick={handleClickOpen} 
            color='success'
          >
            <EditIcon />
          </IconButton>
          <EditModelo isOpen={open} closeModal={handleClose} onComplete={
              () => {
                  handleClose();
                  handleOpenExito();
                  onCompleted();
              }
          } modelo={modelo}/>
          <ExitoDialog open={showExito} onClose={handleCloseExito} message="Modelo editado exitosamente"/>
      </div>
  );
}

export default ModeloFormDialog;
