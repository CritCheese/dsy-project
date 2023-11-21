import { Col, Divider, Layout, Row, Space, Tabs, TabsProps } from "antd";
import React from "react";
import { FolderOpenOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
import { Folder } from "../../../types/folder.type";

type Props = {
  selectedFolder: Folder | undefined;
};

const { Sider } = Layout;

export const RightSideBar: React.FC<Props> = ({ selectedFolder }) => {
  const items: TabsProps["items"] = [
    {
      key: "detail",
      label: "Detail",
      children: "Content of Tab Pane 1",
    },
    {
      key: "action",
      label: "History",
      children: "Content of Tab Pane 2",
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <Sider className={styles.sider}>
      <Row>
        <Col span={24}>
          <Space color="success">
            <FolderOpenOutlined />
            {selectedFolder?.foldername}
          </Space>
        </Col>
        <Divider />
      </Row>
      <Row>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          indicatorSize={(origin) => origin - 16}
        />
      </Row>
    </Sider>
  );
};
