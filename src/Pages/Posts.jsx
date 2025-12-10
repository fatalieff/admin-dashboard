import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import PostModal from "../Posts/PostModal";
import PostTable from "../Posts/PostTable";
import { getPosts, createPost, updatePost, deletePost } from "../Services/api";
function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const loadPost = async () => {
    setLoading(true);
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      message.error("Posts failed to load!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  const handleAdd = () => {
    setEditingPost(null);
    setModalVisible(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      message.error("Error");
    }
  };

  const handleModalSucess = async (values) => {
    try {
      if (editingPost) {
        await updatePost(editingPost.id, values);

        setPosts(
          posts.map((post) =>
            post.id === editingPost ? { ...post, ...values } : post
          )
        );
        message.success("Post Uptade");
      } else {
        /// post yaratmaq
        const response = await createPost({ ...values, userId: 1 });
        setPosts([{ ...response.data, id: Date.now() }, ...posts]);
        message.success("New post added");
      }
      setModalVisible(false);
    } catch (error) {
      message.error("Error");
    }
  };
  return (
    <div>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>POSTS</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          New Post
        </Button>
      </div>

      <PostTable
        posts={posts}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PostModal
        visible={modalVisible}
        post={editingPost}
        onCancel={() => setModalVisible(false)}
        onSuccess={handleModalSucess}
      />
    </div>
  );
}

export default Posts;
