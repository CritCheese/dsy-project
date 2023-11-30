import { Button, Card, Menu, MenuProps, Popover, Space } from "antd";
import React, { useMemo, useState } from "react";
import {
  MoreOutlined,
  DownloadOutlined,
  EditOutlined,
  InfoCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  FileOutlined
} from "@ant-design/icons";

import styles from "./styles.module.scss";
import { Folder } from "../../../types/folder.type";

const baseUrl = 'http://localhost:5050/database'
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  // if (key=='download'){
  //   let results = await fetch(`${baseUrl}/download/${key}`).then(
  // }
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function copyItem(
  label: React.ReactNode,
  key: React.Key,
  icon: React.ReactNode,
  ): MenuItem {
    
    prompt("Add a name for the copied file!")
    return{
      key
    } as MenuItem;
    
  }

type Props = {
  name: String | undefined;
};
export const Item2: React.FC<Props> = ({ name }) => {
  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const text = <span>Title</span>;
  const items: MenuItem[] = [
    getItem("Download", "download", <DownloadOutlined />),
    getItem("Copy", "copy", <CopyOutlined />),
    getItem("Rename", "rename", <EditOutlined />),
    getItem("Detail", "detail", <InfoCircleOutlined />),
    getItem("Delete", "delete", <DeleteOutlined />),
  ];
  const content = (
    <div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 256 }}
        items={items}
      />
    </div>
  );

  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { pointAtCenter: true };
    return showArrow;
  }, [showArrow, arrowAtCenter]);
  return (
    <Card className={styles.card}>
      <Space color="success" className={styles.space}>
        <span>
          <FileOutlined style={{paddingRight: 5}}/>
          {name}

        </span>
        <span>
          <Popover
            placement="bottom"
            trigger="click"
            title={text}
            content={content}
            arrow={mergedArrow}
          >
            <Button icon={<MoreOutlined />}></Button>
          </Popover>
        </span>
      </Space>
    </Card>
  );
};
