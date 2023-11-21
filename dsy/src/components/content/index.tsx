import { Col, Divider, Layout, Row, Space } from "antd";
import React from "react";
import { FileOutlined, FolderOutlined } from "@ant-design/icons";

import styles from './styles.module.scss';
import { Item } from "./item";
import { Folder } from "../../types/folder.type";
import { myFolder } from "../../data/mock.data";

type Props = {
  selectedFolder: Folder | undefined;
};

const { Content } = Layout;

export const ContentComponent: React.FC<Props> = ({ selectedFolder }) => {
  return (
    <Content className={styles.content}>
      <Row>
        <Col span={24}>
          <Space color="success">
            <FolderOutlined />
            Folder
          </Space>
        </Col>
        <Divider />
      </Row>
      <Row style={{ marginTop: '2rem' }}>
        <Col span={4}>
          <Item selectedFolder={selectedFolder || undefined} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Space color="success">
            <FileOutlined />
            File
          </Space>
        </Col>
        <Divider />
      </Row>
    </Content>
  );
};
