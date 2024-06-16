import React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Articulo, ModalType } from '../../types.d';
import { IconButton } from '@mui/material';
import AddArticulo from './AddArticulo.tsx';
import EditArticulo from './EditArticulo.tsx';
import ExitoDialog from '../ExitoDialog.tsx';

interface ArticuloFormDialogProps {
    modalType: ModalType;
    onCompleted: () => Promise<void>;
    articulo ?: Articulo;
}

const ArticuloFormDialog: React.FC<ArticuloFormDialogProps> = ({modalType, onCompleted, articulo}) => {

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
      modalType === ModalType.ADD_ARTICULO ? 
      <div className='text-center'>
          <Button variant='outlined' onClick={handleClickOpen}>Añadir articulo</Button>
          <AddArticulo isOpen={open} closeModal={handleClose} onComplete={
              () => {
                  handleClose();
                  handleOpenExito();
                  onCompleted();
              }
          }/>
          <ExitoDialog open={showExito} onClose={handleCloseExito} message="Artículo añadido exitosamente"/>
      </div>
  : 
      articulo 
      &&
      <div>
          <IconButton onClick={handleClickOpen} color="success">
            <EditIcon />
          </IconButton>
          <EditArticulo 
            isOpen={open} 
            closeModal={handleClose} 
            onComplete={() =>{
                handleClose();
                handleOpenExito();
                onCompleted();
            }} 
            articulo={articulo}
          />
          <ExitoDialog open={showExito} onClose={handleCloseExito} message="Artículo editado exitosamente"/>
      </div>
  );
}

export default ArticuloFormDialog;
