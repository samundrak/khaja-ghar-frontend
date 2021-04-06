import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import Login from "../../components/Login";
import Slide from "../../components/Slide";

const Home = () => {
  return (
    <Row justify="space-around" align="middle">
      <Col span={12}>
        <Text type="success">Eat what you like now...</Text>
        <Slide />
      </Col>
      <Col span={6}>
        <Text type="success">Sign Up!</Text>
        <Login />
      </Col>
    </Row>
  );
};
export default Home;
