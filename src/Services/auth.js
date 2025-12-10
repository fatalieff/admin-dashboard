

export const login = (username, password) => {

  if (username === "admin" && password === "admin") {
    const user = {
      id: 1,
      username: "admin",
      name: "User",
      email: "admin@example.com",
      avatar: null,
      role: "admin",
    };

    const token = "fake-jwt-token" + Date.now();

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return {
      success: true,
      user,
      token,
    };
  }

  return { success: false, message: "Username or password is incorrect!" };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; 
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const updateCurrentUser = (updates) => {
  const user = getCurrentUser();

  if (user) {
    const updateUser = { ...user, ...updates };

    localStorage.setItem("user", JSON.stringify(updateUser));
    return updateUser;
  }

  return null;
};
