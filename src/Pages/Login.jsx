import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Layout,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/auth";
import "./Login.css";
const { Content } = Layout;
const { Title } = Typography;

function LoginPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const result = login(values.username, values.password);
    console.log("Login Succesful", result);

    if (values.username === "admin" && values.password === "admin") {
      notification.success({
        message: "Login Successful",
        description: "You are being redirected...",
        placement: "topRight",
      });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
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
      className="login-background"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Content className="login-container" style={{ display: `flex`, alignItems: `center` }}>
        <Card
          className="login-card"
          style={{
            width: 400,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
          title={
            <Title level={3} className="login-title" style={{ textAlign: "center", margin: 0 }}>
              Admin Panel Login
            </Title>
          }
        >
          <Form
            form={form}
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              className="login-form-item"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username or email address!",
                },
              ]}
            >
              <Input
                className="login-input"
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
              className="login-form-item"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input
                className="login-input"
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

            <Form.Item className="login-form-item">
              <a
                className="login-form-forgot forgot-password-link"
                href=""
                style={{ float: "right" }}
              >
                Forgot Password
              </a>
            </Form.Item>

            <Form.Item className="login-form-item">
              <Button
                className="login-button"
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
