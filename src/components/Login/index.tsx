import React from "react";
import { Form, Input, Button, message } from "antd";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const login = useLogin();

  const handleSubmit = React.useCallback(
    (values) => {
      login(values.username, values.password).catch((err) => {
        message.error(err.response.data.message);
      });
    },
    [login]
  );

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
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
