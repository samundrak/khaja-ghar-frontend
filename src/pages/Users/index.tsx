import { Dropdown, Menu, message, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getUsers, updateUsers } from "../../api";
import { RootState } from "../../store";

const columns: (param: any) => ColumnsType<{}> = (handleActions) => [
  {
    title: "First Name",
    key: "first_name",
    dataIndex: "first_name",
  },
  {
    title: "Last Name",
    key: "last_name",
    dataIndex: "last_name",
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status) =>
      status ? (
        <Tag color="success">Active</Tag>
      ) : (
        <Tag color="red">Not Active</Tag>
      ),
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, row) => {
      return (
        <Dropdown
          overlay={
            <Menu onClick={handleActions(row)}>
              <Menu.Item key="admin">Make Admin</Menu.Item>
              <Menu.Item key="user">Make User</Menu.Item>
              <Menu.Item key="owner">Make Owner</Menu.Item>
            </Menu>
          }
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Actions
          </a>
        </Dropdown>
      );
    },
  },
];
const Users = () => {
  const { data } = useQuery("users", () => getUsers());
  const history = useHistory();
  const state = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (state.user?.role !== "admin") history.push("/app");
  }, [history, state.user?.role]);

  const handleActions = React.useCallback((row: any) => {
    return (event: { key: string }) => {
      updateUsers(row._id, {
        ...row,
        role: event.key,
      })
        .then(() => {
          message.info("User updated successfully.");
        })
        .catch((err) => {
          message.error(
            err.response?.data?.message || "Unable to update users."
          );
        });
    };
  }, []);

  return <Table columns={columns(handleActions)} dataSource={data?.data} />;
};
export default Users;
