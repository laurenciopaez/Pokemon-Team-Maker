

//Agregar o quitar pokemones

import {
    DELETE,
    ADD,
    
} from '../../types';

export const eliminar = (id) => ({type: DELETE, payload: id})

export const agregar = (id) => ({type: ADD, payload: id})

