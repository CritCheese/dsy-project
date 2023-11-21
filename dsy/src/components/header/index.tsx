import {
  Col,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  Row,
  Space,
  Typography,
} from "antd";
import {
  CloudServerOutlined,
  SearchOutlined,
  SettingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

type Props = {};

const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    label: "Logout",
    key: "logout",
  },
];

export const HeaderComponent: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      setOpen(false);
      sessionStorage.removeItem('logged in')
      window.location.replace('/')
    }
  };
  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };
  return (
    <Header className={styles.header}>
      <Row>
        <Col span={8} className={styles.col}>
          <CloudServerOutlined
            style={{ fontSize: "2rem", color: "#fffff", marginRight: "0.5rem" }}
          />
          <Typography.Title>My Storage</Typography.Title>
        </Col>
        <Col span={8} className={styles.col}>
          {/* <Input
            size="large"
            placeholder="Search in storage"
            prefix={<SearchOutlined />}
            addonAfter={<MoreOutlined />}
          /> */}
        </Col>
        <Col span={8}>
          <Space className={styles.space}>
            <Space style={{ marginRight: "2rem" }}>
              {/* <Link to="/register">Register /</Link>
              <Link to="/login">Login</Link> */}
            </Space>
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}
              onOpenChange={handleOpenChange}
              open={open}
              overlayStyle={{ width: "8rem", fontWeight: "500" }}
              placement="bottom"
              trigger={["click"]}
            >
              <Space>
                <SettingOutlined
                  style={{
                    fontSize: "1.5rem",
                    color: "#fffff",
                    marginTop: "0.25rem",
                  }}
                />
              </Space>
            </Dropdown>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};
