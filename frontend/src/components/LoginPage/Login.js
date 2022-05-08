import React from "react";
import { Col, Row } from "react-bootstrap";
import Footer from "./Footer";
import PersonalInfo from "./PersonalInfo";
const Login = () => {
  return (
    <div>
      <Row>
        <Col xs={6}>
          <Footer />
          <PersonalInfo />
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default Login;
