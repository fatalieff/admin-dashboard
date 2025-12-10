import React, { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers, updateUser } from "../Services/api";
import { message } from "antd";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import UsersTable from "../Users/UsersTable";
import UsersModal from "../Users/UsersModal";

function Users() {
  //Usestateler
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  //Data Cekmek
  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);
  //Handle lar
  const handleAdd = () => {
    setEditingUser(null);
    setModalVisible(true);
  };
  const handleEdit = (user) => {
    setEditingUser(user);
    setModalVisible(true);
  };
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id != id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalSucess = async (values) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, values);
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? { ...user, ...values } : user
          )
        );
      } else {
        ///User Yaratmag
        const response = await createUser({ ...values, userId: 1 });
        setUsers([{ ...response.data, id: Date.now() }, ...users]);
        message.success("Yazi elave edildi!");
      }
      setModalVisible(false);
    } catch (error) {
      console.log(error);
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
        <h1>Users</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          New User
        </Button>
      </div>
      <UsersTable
        users={users}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <UsersModal
        visible={modalVisible}
        onSuccess={handleModalSucess}
        user={editingUser}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
}

export default Users;
