import axios, { AxiosResponse } from "axios";
import { ArticuloRequest, Articulo, MarcaRequest, Marca, ModeloRequest, Modelo } from '../types';

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiclient = {
    articulos: {
        getAll(): Promise<AxiosResponse<Articulo[]>> {
            return api.get('/articulo');
        },
        create(articulo: ArticuloRequest): Promise<AxiosResponse<Articulo>> {
            return api.post('/articulo', articulo);
        },
        update(id: number, articulo: ArticuloRequest): Promise<AxiosResponse<Articulo>> {
            return api.put(`/articulo/${id}`, articulo);
        },
        delete(id: number): Promise<AxiosResponse<void>> {
            return api.delete(`/articulo/${id}`);
        }
    },
    marcas: {
        getAll(): Promise<AxiosResponse<Marca[]>> {
            return api.get('/marca');
        },
        create(marca: MarcaRequest): Promise<AxiosResponse<Marca>> {
            return api.post('/marca', marca);
        },
        update(id: number, marca: MarcaRequest): Promise<AxiosResponse<Marca>> {
            return api.put(`/marca/${id}`, marca);
        },
        delete(id: number): Promise<AxiosResponse<void>> {
            return api.delete(`/marca/${id}`);
        }
    },
    modelos: {
        getAll(): Promise<AxiosResponse<Modelo[]>> {
            return api.get('/modelo');
        },
        getByMarca(marcaId: number): Promise<AxiosResponse<Modelo[]>> {
            return api.get(`/modelo/${marcaId}`);
        },
        create(modelo: ModeloRequest): Promise<AxiosResponse<Modelo>> {
            return api.post('/modelo', modelo);
        },
        update(id: number, modelo: ModeloRequest): Promise<AxiosResponse<Modelo>> {
            return api.put(`/modelo/${id}`, modelo);
        },
        delete(id: number): Promise<AxiosResponse<void>> {
            return api.delete(`/modelo/${id}`);
        }
    },
};

export default apiclient;