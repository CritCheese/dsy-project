import { Col, Divider, Layout, Row, Space } from "antd";
import React from "react";
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

// function rowItem(names : []){
//   var itemName = [];
//   for (var x in names) {
//     var render = <Row style={{ marginBottom: '2rem' }}><Col span={10}><Item2 name={x || undefined} /></Col></Row>
//     itemName.push(render)
//   }
//   return(itemName)

// }

// const rowItem = await fetch(`${baseUrl}/storages`).then(function(res){
//   var item1 = res.json().then(function(data){return data})
//   var items = 
//   console.log(items)
//   var itemName = [];
//   for (var x in items) {
//     // console.log(items[x])
//     var render = <Row style={{ marginBottom: '2rem' }}><Col span={10}><Item2 name={x || undefined} /></Col></Row>
//     itemName.push(render)
//   }
//   console.log(itemName)
//   return itemName
// })
// async function getitem(){
// return itemName

// }

async function itemNamex(){
  const rowItem = await fetch(`${baseUrl}/storages`).then(response => response.json())
// var json = JSON.string(rowItem)
console.log(rowItem)
var blob = rowItem.EnumerationResults.Blobs.Blob
var names = []
for (var i in blob) {
  names.push(blob[i].Name._text)
}
console.log(names)

var itemName = [];

for (var x in names) {
  // console.log(items[x])
  var render = <Row style={{ marginBottom: '2rem' }}><Col span={10}><Item2 name={names[x] || undefined} /></Col></Row>
  itemName.push(render)
}

 
console.log(itemName)

  return itemName
}

export const ContentComponent: React.FC<Props> = ({ selectedFolder }) => {
  // console.log(rowItem[1])
  // var names = await fetch(`${baseUrl}/storages`).then(function(res){
  //   return res.status
  // })
  // console.log(names)
  // var x = rowItem(names)
  return (
    <Content className={styles.content}>
      {function x(){itemNamex();return "x"}

      }
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={'file-copy.txt' || undefined} />
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={'home.mp3' || undefined} />
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={'night.docx' || undefined} />
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={'oos.mp4' || undefined} />
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col span={10}>
          <Item2 name={'testing.txt' || undefined} />
        </Col>
      </Row>
    </Content>
  );
};
function getData() {
  return <Space></Space>;
}

function body(arg0: JSX.Element): React.ReactNode {
  throw new Error("Function not implemented.");
}

