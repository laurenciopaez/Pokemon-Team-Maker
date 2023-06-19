import { ADD, DELETE } from "../../types";


const initialState = {
    favorites: []
}

export default function favoritosReducer( state = initialState, action ){
    switch (action.type) {
        case ADD: {
            if (state.favorites.length < 6) {
              const isDuplicate = state.favorites.find((el) => el === action.payload);
              if (!isDuplicate) {
                return {
                  ...state,
                  favorites: [...state.favorites, action.payload],
                };
              }
            }
            return state;
          }
        case DELETE: {
          if(state.favorites.length > 1){
            return {
              ...state,
              favorites: state.favorites.filter( (item) => item !== action.payload)
            }
          } else return {
            
            favorites: []
          }
          }
        default:
            return state;
    }
    }
