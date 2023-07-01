import RegisterForm from "./forms/RegisterForm";
import Card from "react-bootstrap/Card";
import background from "../styles/background.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={background.pageWrapper}>
      <div className={background.backgroundImage_register}>
        <div
          className="align-items-center justify-content-center"
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            marginTop: "20vh",
          }}
        >
          <div style={{ marginBottom: "78vh" }}>
            <Card
              style={{ width: "18rem" }}
              className="shadow-sm bg-body rounded"
            >
              <Card.Body>
                <Card.Title className="text-center ">Register</Card.Title>

                <RegisterForm />
              </Card.Body>
            </Card>
            <Container>
              <Row>
                <Col className="text-center fw-bolder ">Want to come back?</Col>
                <Col className="text-center fw-bolder ">
                  <Link to="/login">Sign in</Link>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
