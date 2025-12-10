import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Typography,
  Layout,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/auth";
const { Header, Content } = Layout;
const { Title } = Typography;

function LoginPage() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const result = login(values.username, values.password);
    console.log("Login Succesful", result);

    if (values.username === "admin" && values.password === "admin") {
      notification.success({
        message: "Login Successful",
        description: "You are being redirected...",
        placement: "topRight",
      });
      navigate("/", { replace: true });
    } else {
      notification.error({
        message: "Login Failed",
        description: "Username or password is incorrect.",
        placement: "topRight",
      });
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #D9E4E4 0%, #A8D0DB 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content style={{ display: `flex`, alignItems: `center` }}>
        <Card
          style={{
            width: 400,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
          title={
            <Title level={3} style={{ textAlign: "center", margin: 0 }}>
              Admin Panel Login
            </Title>
          }
        >
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username or email address!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="admin"
                size="large"
                style={{
                  backgroundColor: "#f0f4f8",
                  borderColor: `#d1d5db`,
                  color: "#374151",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="admin"
                size="large"
                style={{
                  backgroundColor: "#f0f4f8",
                  borderColor: `#d1d5db`,
                  color: "#374151",
                }}
              />
            </Form.Item>

            <Form.Item>
              <a
                className="login-form-forgot"
                href=""
                style={{ float: "right" }}
              >
                Forgot Password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}

export default LoginPage;
