import { Layout, Menu, Dropdown, Space } from "antd";
import React, { useState } from "react";
import { logout } from "../Services/auth";
import { useTheme } from "../contexts/ThemeContext";
import ThemeSwitch from "../Components/ThemeSwitch";
import {
  UserOutlined,
  FileTextOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  CommentOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function MainLayout() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const isDark = theme === "dark";
  const transitionStyle = {
    transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s",
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
      icon: <DashboardOutlined style={{ color: colors.menuItemColor, fontSize: "16px", transition: "all 0.3s" }} />,
      label: (
        <Link to="/">
          <span
            className="text-[16px] font-[500] hover:text-blue-500 transition-colors duration-300"
            style={{ color: colors.textColor }}
          >
            Dashboard
          </span>
        </Link>
      ),
    },
    {
      key: "2",
      icon: <UserOutlined style={{ color: colors.menuItemColor, fontSize: "16px", transition: "all 0.3s" }} />,
      label: (
        <Link to="/users">
          <span
            className="text-[16px] font-[500] hover:text-blue-500 transition-colors duration-300"
            style={{ color: colors.textColor }}
          >
            Users
          </span>
        </Link>
      ),
    },
    {
      key: "3",
      icon: <FileTextOutlined style={{ color: colors.menuItemColor, fontSize: "16px", transition: "all 0.3s" }} />,
      label: (
        <Link to="/posts">
          <span
            className="text-[16px] font-[500] hover:text-blue-500 transition-colors duration-300"
            style={{ color: colors.textColor }}
          >
            Posts
          </span>
        </Link>
      ),
    },
    {
      key: "4",
      icon: <CommentOutlined style={{ color: colors.menuItemColor, fontSize: "16px", transition: "all 0.3s" }} />,
      label: (
        <Link to="/comments">
          <span
            className="text-[16px] font-[500] hover:text-blue-500 transition-colors duration-300"
            style={{ color: colors.textColor }}
          >
            Comments
          </span>
        </Link>
      ),
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: colors.appLayoutBg }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        style={{ 
          background: colors.siderBg, 
          ...transitionStyle,
          boxShadow: collapsed ? "none" : "2px 0 8px rgba(0,0,0,0.15)",
          position: "relative",
          zIndex: 1000
        }}
        className="sidebar-animation"
      >
        <div
          style={{
            height: "70px",
            margin: "15px",
            fontSize: collapsed ? "16px" : "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            transition: "all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s",
          }}
        >
          <p
            className="font-bold"
            style={{ 
              color: colors.textColor, 
              ...transitionStyle,
              whiteSpace: collapsed ? "nowrap" : "normal",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {collapsed ? "A" : "Admin Panel"}
          </p>
        </div>
        <Menu
          theme={isDark ? "dark" : "light"}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{ 
            ...transitionStyle,
            borderRight: "none"
          }}
          className="sidebar-menu"
        />
      </Sider>
      <Layout>
        <Header
          style={{ background: colors.headerBg, ...transitionStyle }}
          className="flex justify-between items-center px-4"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "18px",
                color: colors.textColor,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "6px",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              className="hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <h1
              className="font-bold sm:text-[15px] md:text-[25px] lg:text-[30px]"
              style={{ color: colors.textColor, ...transitionStyle }}
            >
              Admin Dashboard
            </h1>
          </div>
          <Dropdown
            menu={{ items: dropdownItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Space style={{ cursor: "pointer" }}>
              <span style={{ fontSize: `25px`, color: colors.textColor }}>
                <MenuOutlined />
              </span>
            </Space>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "16px 12px",
            padding: "16px",
            borderRadius: `12px`,
            background: colors.contentBg,
            ...transitionStyle,
            color: colors.textColor,
            overflow: 'hidden',
            minHeight: 'calc(100vh - 120px)'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
