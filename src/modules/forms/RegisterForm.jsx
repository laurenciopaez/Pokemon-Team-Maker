import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "axios";
const baseUrl = "http://localhost:3001/usuarios";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: "",
        email: "",
      },
      control: {
        password1: "",
        password2: "",
        username: "",
      },
    };
    this.validacionUsername = this.validacionUsername.bind(this);
  }

  handleChange = async (e) => {
    if (e.target.name === "password1" || e.target.name === "password2") {
      //guardo las contrase;as en el control state
      await this.setState({
        control: {
          ...this.state.control,
          [e.target.name]: e.target.value,
        },
      });
      if (this.state.control.password1 === this.state.control.password2) {
        //comparo las contrase;as y si son iguales las guardo en el state form
        await this.setState({
          form: {
            ...this.state.form,
            password: this.state.control.password1,
          },
        });
      }
    } else {
      if (e.target.name === "username") {
        //si la variable es username, lo guardo en control
        await this.setState({
          control: {
            ...this.state.control,
            [e.target.name]: e.target.value,
          },
        });
      } else {
        await this.setState({
          //sino va a ser el mail
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
          },
        });
      }
    }
    console.log("Form state: ");
    console.log(this.state.form);
    console.log("Control state: ");
    console.log(this.state.control);
  };

  registrarse = async () => {
    const { username, email, password } = this.state.form;

    await axios.post(baseUrl, {
      username: username,
      email: email,
      password: password,
    });

    window.location.href = "./login";
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state.form;
    const { password1, password2 } = this.state.control;

    if (password1 !== password2) {
      alert("The passwords must be the same");
    }

    if (!this.validacionUsername()) {
      alert("Username must include at least 5 characters and 2 numbers");
    } else {
      this.setState({
        form: {
          ...this.state.form,
          username: this.state.control.username,
        },
      });
    }
    console.log(this.state.form);
    if (username && email && password) {
      this.registrarse();
    }
  };

  validacionUsername = () => {
    //validacion del username
    const { username } = this.state.control;

    console.log(username);

    if (username.length < 6) {
      return false;
    }
    let numberN = 0;
    let numberC = 0;

    for (let i = 0; i < username.length; i++) {
      if (!isNaN(username[i])) {
        numberN++;
      }
      numberC++;
    }
    console.log("NumberC: " + numberC);
    console.log("NumberN: " + numberN);
    if (numberN < 2 || numberC < 5) return false;

    return true;
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-2" controlId="username_register">
          <InputGroup className="mb-2">Username</InputGroup>
          <Form.Control
            type="name"
            name="username"
            onChange={this.handleChange}
            placeholder="Escriba su usuario aqui"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-2" controlId="email_register">
          <InputGroup className="mb-2">e-mail</InputGroup>
          <Form.Control
            type="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Escriba su email aqui"
          ></Form.Control>
        </Form.Group>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-2" controlId="password1_register">
                <InputGroup className="mb-2 text-center">Password</InputGroup>
                <Form.Control
                  type="password"
                  name="password1"
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-2" controlId="password2_register">
                <InputGroup className="mb-2 text-center">Password</InputGroup>
                <Form.Control
                  type="password"
                  name="password2"
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <div className="d-grid justify-content-center mt-3">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    );
  }
}

export default RegisterForm;
