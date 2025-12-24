import React from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import CommentsModal from "../Comments/CommentsModal";
import CommentsTable from "../Comments/CommentsTable";
import {
  getComments,
  createComment,
  uptadeComment,
  deleteComment,
} from "../Services/api";
function Comments() {
  //UseStates
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  ///////
  //Get Comments

  const loadComments = async () => {
    setLoading(true);
    try {
      const response = await getComments();
      setComments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  ////////
  //UseEffect
  useEffect(() => {
    loadComments();
  }, []);
  /////////
  //Handle
  const handleAdd = () => {
    setEditingComment(null);
    setModalVisible(true);
  };

  const handleEdit = (comment) => {
    setEditingComment(comment);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      message.error("Error");
    }
  };
  const handleModalSucess = async (values) => {
    try {
      if (editingComment) {
        await uptadeComment(editingComment.id, values);

        setComments(
          comments.map((comment) =>
            comment.id === editingComment.id ? { ...comment, ...values } : comment
          )
        );
        message.success("Comment Uptade");
      } else {
        /// Comment yaratmaq
        const response = await createComment({ ...values, userId: 1 });
        setComments([{ ...response.data, id: Date.now() }, ...comments]);
        message.success("New comment added");
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
        <h1>Comments</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          New Comment
        </Button>
      </div>

      <CommentsTable
        comments={comments}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CommentsModal
        visible={modalVisible}
        comment={editingComment}
        onCancel={() => setModalVisible(false)}
        onSuccess={handleModalSucess}
      />
    </div>
  );
}

export default Comments;
