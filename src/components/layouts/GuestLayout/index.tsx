import { Col, Row } from "antd";
import React from "react";
import Slide from "../../Slide";
import StylishTitle from "../../StylishTitle";

const GuestLayout: React.FC<{}> = (props) => {
  return (
    <Row justify="space-around" align="middle">
      <Col span={12}>
        <StylishTitle>Eat what you like now...</StylishTitle>
        <Slide />
      </Col>
      <Col span={6}>{props.children}</Col>
    </Row>
  );
};
export default GuestLayout;
