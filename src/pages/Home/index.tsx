import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import Login from "../../components/Login";
import Slide from "../../components/Slide";
import StylishText from "../../components/StylishText";
import StylishTitle from "../../components/StylishTitle";

const Home = () => {
  return (
    <Row justify="space-around" align="middle">
      <Col span={12}>
        <StylishText type="success">Eat what you like now...</StylishText>
        <Slide />
      </Col>
      <Col span={6}>
        <StylishTitle type="success">Log in!</StylishTitle>
        <Login />
      </Col>
    </Row>
  );
};
export default Home;
