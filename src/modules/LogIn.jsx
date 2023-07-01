import Card from "react-bootstrap/Card";
import LoginForm from "./forms/LoginForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import background from "../styles/background.module.css";

const Login = () => {
  return (
    <div className={background.pageWrapper}>
      <div className={background.backgroundImage_login}>
        <div
          className="align-items-center justify-content-center"
          style={{ width: "100%", height: "100vh", display: "flex" }}
        >
          <div style={{ marginBottom: "25vh" }}>
            <Card
              style={{ width: "18rem" }}
              className="shadow-sm bg-body rounded"
            >
              <Card.Body>
                <Card.Title className="text-center ">Log In</Card.Title>

                <LoginForm />
              </Card.Body>
            </Card>
            <Container>
              <Row>
                <Col className="text-center">New User?</Col>
                <Col className="text-center">
                  <Link to="/register">Sign Up</Link>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
