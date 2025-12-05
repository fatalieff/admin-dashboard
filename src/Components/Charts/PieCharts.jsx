
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  
} from "recharts";


function PieCharts() {
  const data = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 300 },
    { name: "Category D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div style={{ width: "100%", maxWidth: 400, margin: "auto" }}>
      <ResponsiveContainer width="100%" aspect={1.618}>
        <PieChart margin={{ top: 60, right: 20, bottom: 0, left: 20 }}>
          <Pie
          
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%" 
            cy="60%" 
            outerRadius={100} 
            fill="#8884d8"
            label 
          >
            
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" wrapperStyle={{bottom:`-20%`}} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieCharts;
