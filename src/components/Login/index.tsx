import React from "react";
import { Form, Input, Button, message } from "antd";
import { login } from "../../api";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../store/slices/auth";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = React.useCallback((values) => {
    login({
      password: values.password,
      email: values.username,
    })
      .then((response) => {
        window.localStorage.setItem("token", response.data.token);
        dispatch(fetchProfile());
        history.push("/app");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }, []);

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
