import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Switch } from "antd";

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const icon = isDark ? "☀️ Light" : "🌙 Dark";
  console.log(theme);

  return (
    <div>
      <Switch
        checked={isDark}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
        onChange={toggleTheme}
      >
        {icon}
      </Switch>
    </div>
  );
}

export default ThemeSwitch;
