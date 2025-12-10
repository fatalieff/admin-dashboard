import { Layout, Menu, Dropdown, Space } from "antd";
import React from "react";
import { logout } from "../Services/auth";
import { useTheme } from "../contexts/ThemeContext";
import ThemeSwitch from "../Components/ThemeSwitch";
import {
  UserOutlined,
  FileTextOutlined,
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function MainLayout() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const transitionStyle = {
    transition: "background-color 0.5s ease, color 0.5s ease",
  };
  //Theme Colors
  const colors = {
    siderBg: isDark ? "#001529" : "#fff",
    headerBg: isDark ? "#001529" : "#fff",
    contentBg: isDark ? "#0f172a" : "#fff",
    textColor: isDark ? "#ffffff" : "#000000",
    menuItemColor: isDark ? "#ffffff" : "#000000",
    headerTitleColor: isDark ? "#f8fafc" : "#000000",
    appLayoutBg: isDark ? "#0f172a" : "#f0f4f8",
  };
  //Logout Function
  function handleLogout() {
    logout();
    navigate("/login");
  }
  //Droptown Items
  const dropdownItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
    {
      key: "theme_switch",
      label: (
        <div style={{ padding: "8px 12px" }}>
          <Space>
            <span>Theme:</span>
            <ThemeSwitch />
          </Space>
        </div>
      ),
      disabled: true,
    },
  ];

  //Sider Meni Items
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined style={{ color: colors.menuItemColor }} />,
      label: (
        <Link to="/">
          <span
            className="text-[#fff] text-[16px] font-[500] "
            style={{ color: colors.textColor }}
          >
            Dashboard
          </span>
        </Link>
      ),
    },
    {
      key: "2",
      icon: <UserOutlined style={{ color: colors.menuItemColor }} />,
      label: (
        <Link to="/users">
          <span
            className="text-[#fff] text-[16px] font-[500] "
            style={{ color: colors.textColor }}
          >
            Users
          </span>
        </Link>
      ),
    },
    {
      key: "3",
      icon: <FileTextOutlined style={{ color: colors.menuItemColor }} />,
      label: (
        <Link to="/posts">
          <span
            className="text-[#fff] text-[16px] font-[500] "
            style={{ color: colors.textColor }}
          >
            Posts
          </span>
        </Link>
      ),
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: colors.appLayoutBg }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ background: colors.siderBg, ...transitionStyle }}
      >
        <div
          style={{
            height: "70px",

            margin: "15px",

            fontSize: "20px",
          }}
        >
          <p
            className="text-center text-2xl text-[#fff] font-bold"
            style={{ color: colors.textColor, ...transitionStyle }}
          >
            Admin Panel
          </p>
        </div>
        <Menu
          theme={isDark ? "dark" : "light"}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{ ...transitionStyle }}
        />
      </Sider>
      <Layout>
        <Header
          style={{ background: colors.headerBg, ...transitionStyle }}
          className="flex justify-between"
        >
          <h1
            className="text-[30px] text-center text-[#000] font-bold "
            style={{ color: colors.textColor, ...transitionStyle }}
          >
            Admin Dashboard
          </h1>
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
            <Space style={{ cursor: "pointer" }}>
              <span style={{fontSize:`25px` , color: colors.textColor }} ><MenuOutlined/></span>
            </Space>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: "24px",
            borderRadius: `15px`,
            background: colors.contentBg,
            ...transitionStyle,
            color: colors.textColor,
            ...transitionStyle,
          }}
        >
          <Outlet style={{ backgroundColor: colors.appLayoutBg }} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
