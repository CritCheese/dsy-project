import { Col, Divider, Layout, Row, Space } from "antd";
import React from "react";
import { FileOutlined, FolderOutlined } from "@ant-design/icons";

import styles from './styles.module.scss';
import { Item } from "./item";
import { Item2 } from "./item copy";
import { Folder } from "../../types/folder.type";
import { myFolder } from "../../data/mock.data";

type Props = {
  selectedFolder: Folder | undefined;
};

const { Content } = Layout;

export const ContentComponent: React.FC<Props> = ({ selectedFolder }) => {
  return (
    <Content className={styles.content}>
      {/* <Row>
        <Col span={24}>
          <Space color="success">
            <FolderOutlined />
            My Storage
          </Space>
        </Col>
        <Divider />
      </Row> */}
      {/* <Row style={{ marginBottom: '2rem' }}>
        <Col span={4}>
          <Item selectedFolder={selectedFolder || undefined} />
        </Col>
      </Row> */}
      {/* <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={ 'file.txt' || undefined} />
        </Col>
      </Row> */}
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={ 'file-copy.txt' || undefined} />
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={ 'home.mp3' || undefined} />
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={ 'night.docx' || undefined} />
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={ 'oos.mp4' || undefined} />
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={ 'testing.txt' || undefined} />
        </Col>
      </Row>
      {/* <Divider />
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={4}>
          <Space color="success">
            <FileOutlined />
            call.txt
          </Space>
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={4}>
          <Space color="success">
            <FileOutlined />
            text 1.txt
          </Space>
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={4}>
          <Space color="success">
            <FileOutlined />
            text 2.docx
          </Space>
        </Col>
      </Row> */}
    </Content>
  );
};
