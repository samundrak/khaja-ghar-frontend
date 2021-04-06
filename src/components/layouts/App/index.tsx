import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import StylishTitle from "../../StylishTitle";
import { fetchProfile } from "../../../store/slices/auth";
const { Header, Sider, Content } = Layout;

const AppLayout: React.FC<{}> = (props) => {
  const state = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProfile());
  }, []);

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
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              nav 4
            </Menu.Item>
          </Menu>
        </Sider>
      )}
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 1 }}
        >
          <StylishTitle level={2}>Khaja Ghar</StylishTitle>
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
