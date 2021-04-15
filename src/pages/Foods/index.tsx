import React from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Menu,
  message,
  Row,
  Modal,
  Form,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { createNewFood, getFoods, orderFood } from "../../api";
import { IFood } from "../../interfaces/IFood";
import ImgMomo from "../../images/momo.jpg";
import TextArea from "antd/lib/input/TextArea";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUploadURL, isOwner } from "../../utils";

const { Meta } = Card;

const Foods = () => {
  const [files, setFiles] = React.useState<FileList | null>(null);
  const [formResetKey, setFormResetKey] = React.useState(Date.now());
  const [foods, setFoods] = React.useState<IFood[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const state = useSelector((state: RootState) => state.auth);

  const handleFoodOrder = React.useCallback((food: IFood) => {
    // @ts-ignore
    return (event) => {
      orderFood({
        food_id: food._id,
        //@ts-ignore
        shift: event.key,
      })
        .then((data) => {
          message.info("Food ordered successfully.");
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    };
  }, []);

  React.useEffect(() => {
    getFoods().then((response) => {
      setFoods(response.data);
    });
  }, []);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleAddFood = React.useCallback(
    (values) => {
      const formData = new FormData();
      delete values.images;
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      //@ts-ignore
      Array.from(files).forEach((file) => {
        formData.append(`images`, file);
      });
      createNewFood(formData)
        .then((data) => {
          setFoods([...foods, data.data]);
          message.info("Food added successfully.");
          setIsModalVisible(false);
          setFormResetKey(Date.now());
        })
        .catch((err) => {
          message.error(
            err.response?.data?.message || "We are unable to save food."
          );
        });
    },
    [files, foods]
  );

  return (
    <>
      <Modal
        key={formResetKey}
        title="Add new food"
        visible={isModalVisible}
        onCancel={() => {
          setFormResetKey(Date.now());
          setIsModalVisible(false);
        }}
        okText={() => null}
        cancelText={() => null}
      >
        <Form name="basic" onFinish={handleAddFood}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name of food!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price of food!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please add more details of your food!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Images"
            name="images"
            rules={[
              {
                required: true,
                message: "Please add images!",
              },
            ]}
          >
            <Input
              type="file"
              multiple
              accept="jpg,png,jpeg"
              onChange={(e) => setFiles(e.target.files)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              + Add Food
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Row>
        <Col span={24}>
          <Row>
            <Col span={6}>
              {isOwner(state.user?.role) && (
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                  + Add Food
                </Button>
              )}
            </Col>
            <Col span={6} push={12}>
              <Input.Search
                placeholder="Quick search..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        {foods
          .filter((food) => food.name.includes(searchTerm))
          .map((food) => {
            return (
              <Col span={6} key={food._id}>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  cover={
                    <img
                      alt="Mo:Mo"
                      src={
                        food.images[0] ? getUploadURL(food.images[0]) : ImgMomo
                      }
                    />
                  }
                  actions={[
                    <Dropdown
                      overlay={
                        <Menu onClick={handleFoodOrder(food)}>
                          <Menu.Item key="morning">Morning</Menu.Item>
                          <Menu.Item key="day">Day</Menu.Item>
                          <Menu.Item key="night">Night</Menu.Item>
                        </Menu>
                      }
                    >
                      <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        Order <DownOutlined />
                      </a>
                    </Dropdown>,
                  ]}
                >
                  <Meta
                    // avatar={
                    //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    // }
                    title={food.name}
                    description={`${food.price} RS`}
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};
export default Foods;
