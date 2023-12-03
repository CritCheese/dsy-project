import { Col, Divider, Layout, Row, Space } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import { FileOutlined, FolderOutlined } from "@ant-design/icons";

import styles from './styles.module.scss';
import { Item } from "./item";
import { Item2 } from "./item copy";
import { Folder } from "../../types/folder.type";
import { myFolder } from "../../data/mock.data";
import { JSX } from "react/jsx-runtime";

type Props = {
  selectedFolder: Folder | undefined;
};

const baseUrl = 'http://localhost:5050/database'
const { Content } = Layout;

export const ContentComponent2 = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    const gf = async () => {
      const ri1 = await fetch(`${baseUrl}/storages`)
      const ri2 = await ri1.json()

      // console.log("json", ri2);
      // var 
      // const jp = JSON.parse(ri2)
      const blob = ri2.EnumerationResults.Blobs.Blob
      var names = []
      for (var i in blob) {
        names.push(blob[i].Name._text)
      }

      var list:ReactNode = names.map(function(d){
        return <Row style={{ marginBottom: '2rem' }}><Col span={10}><Item2 name={d || undefined} /></Col></Row>
      })
        // var itemName = [];

        // for (var x in names) {
        //   var render = <div><Row style={{ marginBottom: '2rem' }}><Col span={10}><Item2 name={names[x] || undefined} /></Col></Row></div>
        //   itemName.push(render)
        // }
        // console.log(itemName)
        setData(list);    }
    gf()
  }, []);

  return (
    // <Content className={styles.content}>
      {data}


    //   <Row style={{ marginBottom: '2rem' }}>
    //     <Col span={10}>
    //       <Item2 name={'file-copy.txt' || undefined} />
    //     </Col>
    //   </Row>
    //   <Row style={{ marginBottom: '2rem' }}>
    //     <Col span={10}>
    //       <Item2 name={'home.mp3' || undefined} />
    //     </Col>
    //   </Row>
    //   <Row style={{ marginBottom: '2rem' }}>
    //     <Col span={10}>
    //       <Item2 name={'night.docx' || undefined} />
    //     </Col>
    //   </Row>
    //   <Row style={{ marginBottom: '2rem' }}>
    //     <Col span={10}>
    //       <Item2 name={'oos.mp4' || undefined} />
    //     </Col>
    //   </Row>
    //   <Row style={{ marginBottom: '2rem' }}>
    //     <Col span={10}>
    //       <Item2 name={'testing.txt' || undefined} />
    //     </Col>
    //   </Row>
    // </Content>
  );
};



