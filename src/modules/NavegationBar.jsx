import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/esm/Button";
import {Link} from 'react-router-dom';

import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Navegation extends React.Component {

cerrarSesion() {
    cookies.remove('id', {path:"/"});
    cookies.remove('username', {path: "/"})

    window.location.href="/login";
}

componentDidMount() {
    if(!cookies.get('username')){
        window.location.href="./login"
    }
}

    render(){
    return (
        <>
        <div className='mt-3 align-items-center'  style={{width: '100vw', height: '10vh', display: 'flex', flexDirection: 'column'}}>
            <div className='mb-3 ' style={{height: '20vh'}}>

            </div>
            <div style={{width: '100vw', margin: 'auto'}} className='d-flex justify-content-center' >    
            <Nav className='row' >   
                <Nav.Item className='col-4' >
                    <Button as={Link} to='/main' className='border-2 border-black' style={{width: '25vw'}}>Your Team</Button>
                </Nav.Item>
                <Nav.Item className='col-4' > 
                    <Button as={Link} to='/allopts' className='border-2 border-black' style={{width: '25vw'}}>All options</Button>
                </Nav.Item>
                <Nav.Item  className='col-4'>
                    <Button onClick={()=> this.cerrarSesion()} className='border-2 border-black' style={{width: '25vw'}}>Log out</Button>
                </Nav.Item>
            </Nav>
            </div> 
        </div>
        </>
    )
}}


export default Navegation;



