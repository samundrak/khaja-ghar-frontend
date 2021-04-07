import React from "react";
import { Card, Col, Dropdown, Menu, message, Row } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getFoods, orderFood } from "../../api";
import { IFood } from "../../interfaces/IFood";
import ImgMomo from "../../images/momo.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Foods = () => {
  const [foods, setFoods] = React.useState<IFood[]>([]);

  const handleFoodOrder = React.useCallback((food: IFood) => {
    // @ts-ignore
    return (event) => {
      console.log(event);
      console.log(food, event);
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

  return (
    <Row>
      {foods.map((food) => {
        return (
          <Col span={6}>
            <Card
              style={{ width: 300, marginTop: 16 }}
              cover={<img alt="Mo:Mo" src={ImgMomo} />}
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
  );
};
export default Foods;
