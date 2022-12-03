import React from "react";
import { Container, Row } from "react-bootstrap";
import "./styles/Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Container fluid className="DashContainer">
        <Row className="StylesRow">
          <h1 className="text-center">
            <b>Página principal del sistema</b>
          </h1>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
