import "./App.css";
import MainLayout from "./Layout/MainLayout.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Posts from "./pages/Posts.jsx";
import Users from "./Pages/Users.jsx";
import { BrowserRouter ,Routes , Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
