import React from "react";
import CardPokemon from "./Card";
import NavegationBar from "./NavegationBar";
import axios from "axios";
import background from "../styles/background.module.css";
import { connect } from "react-redux";
import { eliminar, agregar } from "../redux/actions";
import Cookies from "universal-cookie";

const basicUrl = "https://pokeapi.co/api/v2/pokemon";
const dbUrl = "http://localhost:3001/usuarios";
const cookies = new Cookies();

class AllOpt extends React.Component {
  state = {
    pokemones: [],
  };

  //Para que cargue automaticamente
  componentDidMount() {
    this.cargarOpciones();
    this.actualizarDb();
  }

  componentDidUpdate(prevProps) {
    // Verificar si las propiedades favs han cambiado
    if (prevProps.favs !== this.props.favs) {
      this.actualizarDb();
    }
  }

  //Pido a la api los pokemones y los guardo en un estado local
  cargarOpciones = async () => {
    const cantidadPokemones = 400;
    if (this.state.pokemones.length === cantidadPokemones) {
      //acelerar el proceso de carga de datos
    } else {
      try {
        for (let i = 1; i < cantidadPokemones; i++) {
          const response = await axios.get(`${basicUrl}/${i}`);
          const newPokemon = {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            peso: response.data.weight,
          };
          this.setState((prevState) => ({
            pokemones: [...prevState.pokemones, newPokemon],
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(this.state.pokemones);
  };

  actualizarDb = async () => {
    const {
      id: userId,
      username: userName,
      password: userPassword,
      email: userEmail,
    } = cookies.getAll();

    const updatedBDpokemons = []; //array vacio que guarda la coleccion de pokemons

    for (const pokemonId of this.props.favs) {
      //Guardo el id de los favs pero para acceder le tengo que restar uno porque sino sale uno que no es
      const response = await axios.get(`${basicUrl}/${pokemonId}`);

      let infoPokemon = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
      };

      if (Object.keys(infoPokemon).length !== 0) {
        updatedBDpokemons.push(infoPokemon);
      }
    }
    try {
      await axios.put(`${dbUrl}/${userId}`, {
        id: userId,
        username: userName,
        password: userPassword,
        email: userEmail,
        pokemones_fav: updatedBDpokemons,
      });
    } catch (error) {
        throw new Error (console.log(error)) 
    }
  };

  render() {
    return (
      <>
        <div className={background.pageWrapper}>
          <div
            className={background.backgroundImage_allopts}
            style={{ height: "100vh" }}
          >
            <NavegationBar />
            <div
              className="mx-auto row"
              style={{
                width: "80vw",
                height: "80vh",
                overflow: "auto",
                flexbox: "box",
              }}
            >
              {this.state.pokemones.map((el) => (
                <CardPokemon
                  key={el.id}
                  name={el.name}
                  id={el.id}
                  image={el.image}
                  peso={el.peso}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(AllOpt);
