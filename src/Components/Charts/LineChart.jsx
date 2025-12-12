import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function LineCharts() {
  const data = [
    { name: "January", users: 300 },
    { name: "February", users: 250 },
    { name: "Martch", users: 350 },
    { name: "April", users: 400 },
    { name: "May", users: 300 },
    { name: "June", users: 500 },
    { name: "July", users: 700 },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "auto" }}>
      <ResponsiveContainer width="100%" aspect={1.618}>
        <LineChart
          data={data}
          margin={{
            top: 0,
            right: 10,
            bottom: 5,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#fff" strokeDasharray="5 5" />
          <Line
            type="monotone"
            dataKey="users"
            stroke="purple"
            strokeWidth={2}
            name="Registered Users, New Signups, User Activity"
          />
          <XAxis dataKey="name" />
          <YAxis
            width="auto"
            label={{ value: "USERS", position: "insideLeft", angle: -90 }}
          />
          <Legend align="right" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineCharts;
