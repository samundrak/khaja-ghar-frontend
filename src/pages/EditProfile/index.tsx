import React from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateProfile } from "../../api";
import { updateProfileAction } from "../../store/slices/auth";

const EditProfile = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const state = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = React.useCallback(
    (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      formData.delete("photo");
      if (file) formData.append("photo", file);
      updateProfile(state.user?._id || "", formData)
        .then(() => {
          message.info("Profile updated successfully");
          dispatch(updateProfileAction(values));
        })
        .catch(() => {
          message.error("Unable to update profile.");
        });
    },
    [dispatch, state.user?._id, file]
  );

  return (
    <Row>
      <Col push={6} span={12}>
        <Form
          name="basic"
          initialValues={{ ...state.user }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last  Name"
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Profile"
            name="photo"
            rules={[{ required: true, message: "Please upload a photo!" }]}
          >
            <Input
              type="file"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update profile
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default EditProfile;
