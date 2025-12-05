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
    { name: "January", users: 100 },
    { name: "February", users: 250 },
    { name: "Martch", users: 500 },
    { name: "April", users: 110 },
    { name: "May", users: 300 },
    { name: "June", users: 2000 },
    { name: "July", users: 900 },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "auto" }}>
      <ResponsiveContainer width="100%" aspect={1.618}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 5,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
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
