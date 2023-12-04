import {
  Button,
  Form,
  Input,
  Layout,
  Menu,
  MenuProps,
  message,
  Modal,
  Popover,
  Typography,
  Upload,
} from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  FolderOutlined,
  PlusOutlined,
  FolderAddOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import { Folder } from "../../../types/folder.type";
import styles from "./styles.module.scss";
import { myFolder } from "../../../data/mock.data";

type Props = {
  setSelectedFolder: Dispatch<SetStateAction<Folder | undefined>>;
};
type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;

export const LeftSideBar: React.FC<Props> = ({ setSelectedFolder }) => {
  const [mockData, setMockData] = useState<Folder[]>(myFolder);
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
  };

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    onClick?: Function
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  };

  const items: MenuItem[] = mockData.map((folder: Folder) => {
    return getItem(
      folder.foldername,
      folder.id,
      <FolderOutlined />,
      folder?.children?.map((sub_folder) => {
        if (sub_folder.hasChildren) {
          return getItem(
            sub_folder.foldername,
            sub_folder.id,
            <FolderOutlined />,
            sub_folder.children?.map((sub) => {
              return getItem(sub.foldername, sub.id, <FolderOutlined />);
            })
          );
        }
        return getItem(
          sub_folder.foldername,
          sub_folder.id,
          <FolderOutlined />
        );
      })
    );
  });

  const onSelectFolder = (item: any) => {
    console.log(item);
    if (item.keyPath.length == 2) {
      const folder = mockData[0]?.children?.find(
        (child) => child.id === item.keyPath[0]
      );
      setSelectedFolder(folder);
    } else {
      const folder = mockData[0]?.children
        ?.find((child) => child.id === item.keyPath[1])
        ?.children?.find((subChild) => subChild?.id === item.keyPath[0]);
      setSelectedFolder(folder);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const options: MenuItem[] = [
    // getItem("New Folder", "newFolder", <FolderAddOutlined />),
    getItem(
      "",
      "uploadFile",
      <Upload {...props}>
        <Typography>
          <FileAddOutlined style={{ marginRight: "10px" }} />
          Upload File
        </Typography>
      </Upload>
    ),
    // getItem(
    //   "",
    //   "uploadFolder",
    //   <Upload
    //     action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
    //     directory
    //   >
    //     <Typography>
    //       <FolderAddOutlined style={{ marginRight: "10px" }} />
    //       Upload Directory
    //     </Typography>
    //   </Upload>
    // ),
  ];

  const content = (
    <div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        style={{ width: 256 }}
        items={options}
        onClick={({ key }) => onSelectAction(key)}
      />
    </div>
  );

  const onSelectAction = (key: string) => {
    setAction(key);
    if (key === "newFolder") {
      setIsModalOpen(true);
    }
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    myFolder[0]?.children?.push({
      id: values.foldername,
      foldername: values.foldername,
      mimetype: "",
      shared: false,
      copyable: false,
      hasThumbnail: false,
      owner: "owner",
      hasChildren: false,
    });
    setMockData([...myFolder]);
    setIsModalOpen(false);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={styles.sider}
    >
      {/* <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload> */}
      <Popover
        content={content}
        title=""
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="rightTop"
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.btnUpload}
        >
          Upload
        </Button>
      </Popover>
      <Menu
        theme="dark"
        defaultSelectedKeys={["my_folder"]}
        mode="inline"
        items={items}
        onSelect={(item) => onSelectFolder(item)}
      />
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className={styles.modal}
      >
        {action === "newFolder" && (
          <Form autoComplete="off" onFinish={onFinish}>
            <Form.Item
              label="Folder name"
              name="foldername"
              rules={[
                { required: true, message: "Please input your folder name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                OK
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Sider>
  );
};
