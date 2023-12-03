import { Layout, Space } from "antd";
import React, { useState } from "react";
import { ContentComponent2 } from "../../components/content";
import { HeaderComponent } from "../../components/header";
import { LeftSideBar } from "../../components/nav/left-side";
import { RightSideBar } from "../../components/nav/right-side";
import { Folder } from "../../types/folder.type";
import { myFolder } from "../../data/mock.data";

type Props = {};

export const HomePage: React.FC<Props> = () => {
  const [selectedFolder, setSelectedFolder] = useState<Folder>();
  if (sessionStorage.getItem("logged in") != "true") {
    window.location.replace("/")
    return(<Space></Space>)
  } else {
    return (
      <Space direction="vertical" style={{ width: "100%", position: "absolute" }}>
        <Layout>
          <HeaderComponent />
          <Layout hasSider style={{ backgroundColor: "rgb(233 232 232)" }}>
            <LeftSideBar setSelectedFolder={setSelectedFolder || undefined} />
            {/* myFolder.forEach((element) { */}
              {/* <ContentComponent2 /> */}
            {/* }); */}
            {/* <RightSideBar selectedFolder={selectedFolder || undefined} /> */}
          </Layout>
        </Layout>
      </Space>
    );
  };
};
