import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import React from "react";
import { Link } from "react-router-dom";

const AuthMenu = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = React.useCallback(() => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  }, []);

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="0">
            <Link to="/profile">Edit</Link>
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item key="3" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      }
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {user?.first_name} {user?.last_name}
        <DownOutlined />
      </a>
    </Dropdown>
  );
};
export default AuthMenu;
