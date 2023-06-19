import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import fondoPokemon from '../images/fondo_pokemon.png';
import { eliminar } from '../redux/actions';
import {connect} from 'react-redux';

const FavoriteCard = ({ key, id, name, image , eliminar}) => {
  return (
    <div className='col-4'>
      <Card
        style={{ 
            height: '36vh', 
            margin: 'auto', 
            width: '20vw', 
            backgroundImage: `url(${fondoPokemon})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center' }}
        className="mb-3 mt-3 bg-body-tertiary rounded justify-content-center text-bg-warning border border-warning"
      >
        <div style={{ width: '90%', height: '20vh', margin: 'auto', overflow: 'hidden' }} className='mr-2 ml-2 flex mt-2'>
          <div className="text-center">
            <Card.Img src={image} variant="top" style={{ width: '15vh' }} className="mx-auto " />
          </div>
        </div>
        <Card.Title className="text-center">
          {name} #{id}
        </Card.Title>
        <Button variant="danger" onClick={() => eliminar(id)}>Eliminar</Button>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    eliminar: (id) => dispatch(eliminar(id))
  }
}

export default connect(null, mapDispatchToProps)(FavoriteCard);