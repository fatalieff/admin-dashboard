import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (user) => api.post("/users", user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const getPosts = () => api.get("/posts");
export const getPostById = (id) => api.get(`/posts/${id}`);
export const createPost = (post) => api.post("/posts", post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export const getComments = () => api.get("/comments");
export const getCommentById = (id) => api.get(`/comments/${id}`);
export const createComment = (comment) => api.post("/comments", comment);
export const uptadeComment = (id, comment) => api.put(`/comments/${id}`, comment);
export const deleteComment = (id) => api.delete(`/comments/${id}`);

export default api;
