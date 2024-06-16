import axios from "axios";
import { ArticuloRequest, MarcaRequest, ModeloRequest } from '../types';

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
    articulos : {
        async getAll(){
            return api.get('/articulo');
        },
        async create(articulo: ArticuloRequest){
            return api.post('/articulo', articulo);
        },
        async update(id:number, articulo:ArticuloRequest){
            return api.put(`/articulo/${id}`, articulo);
        },
        async delete(id: number){
            return api.delete(`/articulo/${id}`);
        }
    },
    marcas:{
        async getAll(){
            return api.get('/marca');
        },
        async create(marca: MarcaRequest){
            return api.post('/marca', marca);
        },
        async update(id:number, marca: MarcaRequest){
            return api.put(`/marca/${id}`, marca);
        },
        async delete(id: number){
            return api.delete(`/marca/${id}`);
        }
    },
    modelos:{
        async getAll(){
            return api.get('/modelo');
        },
        async getByMarca(marcaId: number){
            return api.get(`/modelo/${marcaId}`);
        },
        async create(modelo: ModeloRequest){
            return api.post('/modelo', modelo);
        },
        async update(id:number, modelo:ModeloRequest){
            return api.put(`/modelo/${id}`, modelo);
        },
        async delete(id: number){
            return api.delete(`/modelo/${id}`);
        }
    },
}