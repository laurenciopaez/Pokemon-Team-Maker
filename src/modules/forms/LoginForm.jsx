import React from "react";
import Form  from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/esm/Button";
import Cookies from 'universal-cookie'; // Cookies para usar en la pagina
//Guardar o pedir info en api login
import axios from 'axios';
const baseUrl = 'http://localhost:3001/usuarios';


//Guardar la info del usuario y el id

const cookies = new Cookies();

class LoginForm extends React.Component {
    state= {
        form: {
            username: '',
            password: '',
        }
    }

    //Guardar los inputs en el estado
    handleChange = async (e) => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form)
    }

    //Enviar la peticion a la api
    iniciarSesion = async() => {
        await axios.get(baseUrl, {params: {username:this.state.form.username, password: this.state.form.password}})
        .then(response => {
            return response.data  //al retornarlo te lo envia al proximo then
        })
        .then(response => {
            if(response.length >0){
                var answer = response[0];
                cookies.set("id", answer.id, {path: "/"})
                cookies.set("username", answer.username, {path: "/"})
                cookies.set("email", answer.email, {path: "/"})
                cookies.set("password", answer.password, {path: "/"})

                window.location.href="./main";

            } else{
                alert('User or password incorrect')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }


    render(){
        return(
        
            <Form>
            <Form.Group className="mb-2" controlId="username_login">
                <InputGroup className="mb-2">Username</InputGroup>
                <Form.Control type="name" name="username" onChange={this.handleChange} >

                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-2" controlId="password_login">
                <InputGroup className="mb-2">Password</InputGroup>
                <Form.Control type="password" name="password" onChange={this.handleChange}>

                </Form.Control>
            </Form.Group>
            <div className="d-grid justify-content-center mt-3">
            <Button /* type="submit" */ onClick={()=>{this.iniciarSesion()}}>Enter</Button>
            </div>
            </Form>
            

        );
    };

}

export default LoginForm;