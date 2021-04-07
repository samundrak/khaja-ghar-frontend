import React from "react";
import { Form, Input, Button, message } from "antd";
import GuestLayout from "../../components/layouts/GuestLayout";
import StylishTitle from "../../components/StylishTitle";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { register } from "../../api";

const Register = () => {
  const login = useLogin();

  const handleSubmit = React.useCallback(
    (values) => {
      register(values)
        .then(() => {
          login(values.email, values.password);
        })
        .catch((err) => {
          message.error(err.response?.data?.message);
        });
    },
    [login]
  );

  return (
    <GuestLayout>
      <StylishTitle level={1}>Join us Now!</StylishTitle>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>{" "}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
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
            Register
          </Button>
        </Form.Item>
      </Form>
      <StylishTitle level={3}>
        Have an account? <Link to="/">Login Now!</Link>
      </StylishTitle>
    </GuestLayout>
  );
};
export default Register;
