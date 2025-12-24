import "./App.css";
import MainLayout from "./Layout/MainLayout.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Posts from "./Pages/Posts.jsx";
import LoginPage from "./Pages/Login.jsx";
import { isAuthenticated } from "./Services/auth.js";
import Users from "./Pages/Users.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Comments from "./Pages/Comments.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Login route */}
          <Route
            path="/login"
            element={
              isAuthenticated() ? <Navigate to="/" replace /> : <LoginPage />
            }
          />

          {/*Protected route */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="posts" element={<Posts />} />
            <Route path="comments" element={<Comments />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
