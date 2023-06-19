import NavegationBar from './NavegationBar';
import Cookies from 'universal-cookie';
import React from 'react'
import axios from 'axios';
import background from '../styles/background.module.css';
import {connect} from 'react-redux'
import { eliminar, agregar } from '../redux/actions';
import FavoriteCard from './FavoriteCard';


const cookies = new Cookies();

const dbUrl = 'http://localhost:3001/usuarios';


class Main extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            pokemones_favE: []
        }
    }
    

componentDidMount() {
    this.mostrarBaseDeDatos();        //actualiza el estado local de los favoritos
}

componentDidUpdate(prevProps) {
  // Verificar si las propiedades favs han cambiado
  if (prevProps.pokemones_favE !== this.props.pokemones_favE) {
    this.mostrarBaseDeDatos();
  }
}
//agarra lo de la base de datos, lo carga en estado local y lo muestra
mostrarBaseDeDatos = async () => {
  const userId = cookies.get('id');
  try {
    const response = await axios.get(`${dbUrl}/${userId}`);
    if (response.data.pokemones_fav && Array.isArray(response.data.pokemones_fav)) {

      for (let i = 0; i < response.data.pokemones_fav.length; i++) {
        const { id, name, image } = response.data.pokemones_fav[i];

        const existingPokemon = this.state.pokemones_favE.find((pokemon) => pokemon.id === id);

        if (!existingPokemon) {
          this.setState((prevState) => ({
            pokemones_favE: [
              ...prevState.pokemones_favE,
              {
                id: id,
                name: name,
                image: image,
              },
            ],
          }));
          
          console.log('id: '+id)
          this.props.agregar(id);
          console.log('state: '+this.props.favs)
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

    render(){
    return(
        <>
            <div className={background.pageWrapper} >
                <div className={background.backgroundImage_main}  style={{height: '100vh'}}>
            <NavegationBar/>
        <div className=' mx-auto' style={{width: '80vw',height: '80vh'}}>
            <div className='mx-auto row' style={{width: '80vw',height: '80vh', overflow:'hidden',flexbox:'box'}}>
                {this.state.pokemones_favE.map( (el) => (
                    <FavoriteCard
                        key = {el.id}
                        name = {el.name}
                        image = {el.image}
                        id = {el.id}
                    />
                ))}
            </div>
        </div>
                </div>
            </div>
        </>
    );
}};

const mapStateToProps = (state) => {
    return {
        favs: state.favoritos.favorites,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        eliminar: () => dispatch(eliminar()),
        agregar: (id) => dispatch(agregar(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);