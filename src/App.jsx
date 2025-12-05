import "./App.css";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./Pages/Dashboard";
import Posts from "./pages/Posts";
import Users from "./Pages/Users";
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
