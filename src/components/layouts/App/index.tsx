import React from "react";
import { Col, Layout, Menu, Row } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import StylishTitle from "../../StylishTitle";
import { fetchProfile } from "../../../store/slices/auth";
import StylishText from "../../StylishText";
import { Link, useHistory } from "react-router-dom";
import { AuthStateStatus } from "../../../enums/AuthStateEnum";
import { unwrapResult } from "@reduxjs/toolkit";
import AuthMenu from "../../AuthMenu";
const { Header, Sider, Content } = Layout;

const AppLayout: React.FC<{}> = (props) => {
  const state = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    if (state.status === AuthStateStatus.REJECTED) {
      history.push("/");
    }
    if (
      state.status === AuthStateStatus.SUCCESS &&
      history.location.pathname === "/"
    ) {
      history.push("/app");
    }
  }, [history, state.status]);

  React.useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (
    state.status === AuthStateStatus.PENDING ||
    state.status === AuthStateStatus.NONE
  ) {
    return null;
  }
  return (
    <Layout>
      {state.user && (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          {/* <div className="logo">
            <StylishTitle level={4}>Canteen</StylishTitle>
          </div> */}
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            {state.user.role === "admin" && (
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/users">
                  {" "}
                  <StylishText>Users</StylishText>
                </Link>{" "}
              </Menu.Item>
            )}
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/foods">
                {" "}
                <StylishText>Foods</StylishText>
              </Link>{" "}
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/orders">
                <StylishText>Orders</StylishText>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="4" icon={<UserOutlined />}>
              nav 4
            </Menu.Item> */}
          </Menu>
        </Sider>
      )}
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 1 }}
        >
          <Row>
            <Col span={20}>
              <StylishTitle level={2}>Khaja Ghar</StylishTitle>
            </Col>
            <Col>{state.user && <AuthMenu />}</Col>
          </Row>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: "100vh" }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
