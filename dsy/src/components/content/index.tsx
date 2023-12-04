import { Col,  Layout, Row } from "antd";
import { useEffect, useState } from "react";

import styles from './styles.module.scss';
import { Item2 } from "./item copy";

const baseUrl = 'http://localhost:5050/database'
const { Content } = Layout;

const gf = async () => {
  const ri1 = await fetch(`${baseUrl}/storages`).then(async function (res) {
    const ri2 = await res.json().then(function (res) {
      const blob = res.EnumerationResults.Blobs.Blob
      var names = []
      for (var i in blob) {
        names.push(blob[i].Name._text)
      }
      return names
    })
    return ri2
  })
  return ri1
}

function itemRender(i: string) {
  return <Row style={{ marginBottom: '2rem' }}>
    <Col span={10}>
      <Item2 name={i || undefined} />
    </Col>
  </Row>
}

export const ContentComponent2 = () => {
    useEffect(() => {
    const ue = async () => {
      const ri1 = await gf()
      setBody(ri1)
    }
    ue()
  }, [])
  const [body, setBody] = useState<string[]>([])

  return (
    <Content className={styles.content}>
      {body.map(itemRender)}
    </Content>
  );
};



