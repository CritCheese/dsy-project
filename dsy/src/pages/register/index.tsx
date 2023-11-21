import { Space } from "antd";
import React from "react";
import { AuthForm } from "../../auth-form";
import styles from './styles.module.scss';

type Props = {};

export const RegisterPage: React.FC<Props> = () => {
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", position: "absolute" }}
      className={styles.container}
    >
        <AuthForm isRegister={true} />
    </Space>
  );
};
