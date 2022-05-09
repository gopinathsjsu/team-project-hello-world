import React from "react";
import { Col, Row } from "react-bootstrap";
import Header from "./Header";
import PersonalInfo from "./PersonalInfo";
const Register = () => {
  return (
    <div>
      <Row style={{ marginRight: "0" }}>
        <Col style={{ paddingRight: "0" }}>
          <Header />
        </Col>
        <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
          <PersonalInfo />
        </Col>
      </Row>
    </div>
  );
};

export default Register;
