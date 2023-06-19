import {combineReducers} from 'redux'

import favoritosReducer from './favoritosReducer';


const reducer = combineReducers({
   favoritos: favoritosReducer, //reducer para los favoritos
})

export default reducer;