import React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Marca, ModalType } from '../../types.d';
import { IconButton } from '@mui/material';
import ExitoDialog from '../ExitoDialog.tsx';
import AddMarca from './AddMarca.tsx';
import EditMarca from './EditMarca.tsx';

interface MarcaFormDialogProps {
    modalType: ModalType;
    onCompleted: () => void;
    marca ?: Marca;
}

const MarcaFormDialog: React.FC<MarcaFormDialogProps> = ({modalType, onCompleted, marca}) => {
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
      modalType === ModalType.ADD_MARCA ? 
      <div className='text-center'>
          <Button variant='outlined' onClick={handleClickOpen}>Añadir marca</Button>
          <AddMarca isOpen={open} closeModal={handleClose} onComplete={
              () => {
                  handleClose();
                  handleOpenExito();
                  onCompleted();
              }
          }/>
          <ExitoDialog open={showExito} onClose={handleCloseExito} message="Marca añadida exitosamente"/>
      </div>
  : 
      marca 
      &&
      <div>
          <IconButton onClick={handleClickOpen} color="success">
            <EditIcon />
          </IconButton>
          <EditMarca isOpen={open} closeModal={handleClose} onComplete={
              () => {
                  handleClose();
                  handleOpenExito();
                  onCompleted();
              }
          } marca={marca}/>
          <ExitoDialog open={showExito} onClose={handleCloseExito} message="Marca editada exitosamente"/>
      </div>
  );
}

export default MarcaFormDialog;
