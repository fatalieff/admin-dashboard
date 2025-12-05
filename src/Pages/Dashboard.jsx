import React, { useState, useEffect } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { UserOutlined, FileTextOutlined } from "@ant-design/icons";
import { getUsers, getPosts } from "../services/api";
import LineCharts from "../Components/Charts/LineChart";
import { Line } from "recharts";
import PieChartExample from "../Components/Charts/PieCharts";
import { useTheme } from "../contexts/ThemeContext";

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  const loadData = async () => {
    try {
      const [usersRes, postRes] = await Promise.all([getUsers(), getPosts()]);
      setUserCount(usersRes.data.length);
      setPostCount(postRes.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  //Contexts
  const { theme } = useTheme();
  const isDark = theme === "dark";
  //Colors
  const colors = {
    cardBg: isDark ? "#1e293b" : "#ffffff", // Koyu veya açık kart fonu
    textColor: isDark ? "#f8fafc" : "#000000", // Koyu veya açık yazı rengi
    statisticValueColor: isDark ? "#3b82f6" : "#1d4ed8", // Statistik dəyər rəngi
    iconColor: isDark ? "#3b82f6" : "#1d4ed8",
  };
  //Trasnition
  const transitionStyle = { transition: "background-color 0.5s ease-in-out" };
  return (
    <div style={{ color: colors.textColor, ...transitionStyle }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            style={{
              backgroundColor: colors.cardBg,
              color: colors.textColor,
              border: isDark ? "1px solid #334155" : "1px solid #f0f0f0",
            }}
          >
            <Statistic
              title={<span style={{ color: colors.textColor }}>All Users</span>}
              value={userCount}
              valueStyle={{ color: colors.statisticValueColor }}
              prefix={<UserOutlined style={{ color: colors.iconColor }} />}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            style={{
              backgroundColor: colors.cardBg,
              color: colors.textColor,
              border: isDark ? "1px solid #334155" : "1px solid #f0f0f0",
            }}
          >
            <Statistic
              title={<span style={{ color: colors.textColor }}>All Users</span>}
              value={postCount}
              valueStyle={{ color: colors.statisticValueColor }}
              prefix={<FileTextOutlined style={{ color: colors.iconColor }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card
            title={
              <span style={{ color: colors.textColor }}>Users Activity</span>
            }
            bordered={false}
            style={{
              backgroundColor: colors.cardBg,
              border: isDark ? "1px solid #334155" : "1px solid #f0f0f0",
            }}
          >
            <LineCharts />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={<span style={{ color: colors.textColor }}>Pie Chart </span>}
            bordered={false}
            style={{
              backgroundColor: colors.cardBg,
              height: `100%`,
              border: isDark ? "1px solid #334155" : "1px solid #f0f0f0",
            }}
          >
            <PieChartExample />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Dashboard;
