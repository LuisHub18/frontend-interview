export interface Articulo{
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    fechaCreacion: string;
    modelo: Modelo;
}

export interface ArticuloRequest{
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    modeloId: number;
}

export interface Marca{
    id: number;
    nombre: string;
}

export interface MarcaRequest{
    nombre: string;
}

export interface Modelo{
    id: number;
    nombre: string;
    marca: Marca;
}

export interface ModeloRequest{
    nombre: string;
    marcaId: number;
}

export enum ModalType{
    ADD_ARTICULO = 'ADD_ARTICULO',
    EDIT_ARTICULO = 'EDIT_ARTICULO',
    ADD_MODELO = 'ADD_MODELO',
    EDIT_MODELO = 'EDIT_MODELO',
    ADD_MARCA = 'ADD_MARCA',
    EDIT_MARCA = 'EDIT_MARCA'
}
