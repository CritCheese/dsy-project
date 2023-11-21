import { Button, Checkbox, Form, Input, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";

type Props = {
  isRegister: boolean;
};

export const AuthForm: React.FC<Props> = ({ isRegister }) => {
  const baseUrl = 'http://localhost:5050'
  const onFinish = async (values: any) => {
    // console.log("Success:", values);
    if (!isRegister) {
      let results = await fetch(`${baseUrl}/database/user/?email=${values.username}&password=${values.password}`).then(res => {
        if (res.status == 500) {
          onFinishFailed("invalid credentials")
          alert("Wrong credentials")
          // } else if(res.status == 500){
        } else {
          sessionStorage.setItem("logged in", "true")
          window.location.replace("/home")
        }
      })
    } else {
      let results = await fetch(`${baseUrl}/database/user/?email=${values.username}&password=${values.password}`).then(res => {
        if (res.status == 500) {
          let results = fetch(`${baseUrl}/database/user/register/`, {
            method:'POST',
            body: `{"name":"user","email":"${values.username}","password":"${values.password}","storage":["storage0"]}`
          }).then(res => {
            if (res.status == 200) {
              alert("User created successfully")
              sessionStorage.setItem('logged in', 'true')
              window.location.replace('/home')
            }
          })
        } else if (res.status == 200) {
          alert("User already exists")
        }
      })
    };
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onRegisterCall = () => {
    window.location.replace('/register')
  };

  const onLoginCall = () => {
    window.location.replace('/')
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    confirmPassword?: string;
  };

  if (sessionStorage.getItem('logged in') == 'true') {
    window.location.replace('/home')
    return (<Space></Space>)
  } else {
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, border: '1px solid', borderRadius: '1rem', padding: '3rem' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        {isRegister && (
          <Form.Item<FieldType>
            label="Confirm PW"
            name="confirmPassword"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        {/* {!isRegister && (
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 5, span: 20 }}
          >
            <Checkbox>Remember me (not working)</Checkbox>
          </Form.Item>
        )} */}

        {isRegister ? (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" >
              Register
            </Button>
            <Button htmlType="submit" type='link' onClick={onLoginCall}>
              Login
            </Button>
          </Form.Item>
        ) : (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button htmlType="submit" type='link' onClick={onRegisterCall}>
              Register
            </Button>
          </Form.Item>

        )}
      </Form>
    );
  };
};
