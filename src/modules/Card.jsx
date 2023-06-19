import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import {connect} from 'react-redux'
import { agregar, eliminar } from "../redux/actions";
import pokebolaicon from '../images/pokebola.png'

const CardPokemon = ({key,id,name,image, agregar, favs, peso, eliminar}) => {

const [esFavorito, setEsFavorito] = useState(false);

useEffect( () => {
    
    const controlarFavoritos = () => {
        
        if (Array.isArray(favs) && favs.length > 0) {
          const favoritoEncontrado = favs.find((el) => el === id);
          setEsFavorito(favoritoEncontrado !== undefined);
        } else {
          setEsFavorito(false);
        }
      };

    controlarFavoritos();
    
}, [favs, id]);

const controlFavs = (id) => {
    if(esFavorito){
        eliminar(id)
        console.log('eliminar')
        console.log(id)
        
    } else {
        agregar(id)
        console.log('agregar')
        console.log(id)
    }
}


    return (
        <>
        <div className='col-4'>
            <Card style={{height: '27vh', margin: 'auto', width: '20vw'}} className="mb-3 mt-3 bg-body-tertiary rounded justify-content-center text-bg-warning border border-warning">
                <div style={{width: '90%', height: '13vh', margin: 'auto', overflow: 'hidden'}} className='mr-2 ml-2 flex mt-2' >
                    <div className="text-center" >
                    <Card.Img src={image} variant="top"  style={{width: '9vh',}} className="mx-auto "></Card.Img>
                    {esFavorito ? <Card.Img src={pokebolaicon} alt="pokebola" style={{ position: 'absolute', top: 0, right: 0, width: '15%' }}/> : <></>}
                    </div> {/* SI LO PUSISTE EN FAVORITOS, QUE APAREZCA UNA POKEBOLA AL LADO DE LA IMAGEN */}
                </div>  {/* AGREGAR BOTON POKEDEX */}
                <Card.Title className="text-center">{name} #{id}</Card.Title> {/* Agregar tipo de pokemon */}
                <Card.Text className="text-center fw-bolder">Weight: {peso} lb</Card.Text>
                <Button variant="danger" onClick={()=>{controlFavs(id)}}>Fav</Button>
                
            </Card>
        </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        favs: state.favoritos.favorites,
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        eliminar: (id) => dispatch(eliminar(id)),
        agregar: (id) => dispatch(agregar(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPokemon);