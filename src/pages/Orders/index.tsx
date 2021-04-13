import { Dropdown, Menu, message, Table, Tag } from "antd";
import startCase from "lodash.startcase";
import { ColumnsType } from "antd/lib/table";
import { useQuery } from "react-query";
import { deleteOrder, getOrders, updateOrder } from "../../api";
import { useSelector } from "react-redux";
import configureAppStore, { RootState } from "../../store";
import React from "react";
import { isOwner } from "../../utils";

const tagMap = {
  pending: "processing",
  approved: "success",
  rejected: "error",
  served: "default",
};
const columns: ColumnsType<{}> = [
  {
    title: "Order Id",
    key: "orderId",
    dataIndex: "_id",
  },
  {
    title: "Food",
    key: "food.name",
    dataIndex: "food",
    render: (food) => food.name,
  },
  {
    title: "Food",
    key: "food.price",
    dataIndex: "food",
    render: (food) => `${food.price} RS`,
  },
  {
    title: "Shift",
    key: "shift",
    dataIndex: "shift",
    render: (shift) => startCase(shift),
  },
  {
    title: "Ordered On",
    key: "created_at",
    dataIndex: "created_at",
    render: (shift) => shift,
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (shift: "pending" | "approved" | "rejected") => {
      return <Tag color={tagMap[shift]}>{startCase(shift)}</Tag>;
    },
  },
];
const Orders = () => {
  const { data } = useQuery("orders", () => getOrders());
  const state = useSelector((state: RootState) => state.auth);

  const handleActions = React.useCallback((row) => {
    return async (event: any) => {
      if (
        event.key === "cancel" &&
        window.confirm("Are you sure as this action will remove this order?")
      ) {
        try {
          await deleteOrder(row._id);
        } catch (err) {
          message.error(
            err.response?.data?.message || "Unable to cancel this order."
          );
        }
        return;
      }
      updateOrder(row._id, {
        food_id: row.food_id,
        shift: row.shift,
        status: event.key,
      })
        .then(() => {
          message.info("Order updated successfully");
        })
        .catch((err) => {
          message.error(
            err.response?.data?.message || "Unable to update order!"
          );
        });
    };
  }, []);

  const memoizedTableColumns = React.useMemo(() => {
    const actionColumn = [
      {
        title: "Actions",
        key: "actions",
        render: (_: any, row: {}) => {
          return (
            <Dropdown
              overlay={
                <Menu onClick={handleActions(row)}>
                  {isOwner(state.user?.role) && (
                    <>
                      <Menu.Item key="approved">Approve</Menu.Item>
                      <Menu.Item key="rejected">Reject</Menu.Item>
                      <Menu.Item key="served">Served</Menu.Item>
                    </>
                  )}
                  <Menu.Item key="cancel">Cancel</Menu.Item>
                </Menu>
              }
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Actions
              </a>
            </Dropdown>
          );
        },
      },
    ];
    return [...columns].concat(actionColumn);
  }, [handleActions, state.user?.role]);

  return <Table columns={memoizedTableColumns} dataSource={data?.data} />;
};
export default Orders;
