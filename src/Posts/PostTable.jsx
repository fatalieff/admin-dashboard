import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Table, Button, Space, Input, Popconfirm, message, Tag } from "antd";

import React, { useState } from "react";

function PostTable({ posts, loading, onEdit, onDelete }) {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record.title.toLowerCase().includes(value.toLowerCase()) ||
          record.body.toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Content",
      dataIndex: "body",
      key: "body",

      render: (text) => text.substring(0, 100) + "....",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 100,
      render: (userId) => <Tag color="blue"> User {userId}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            size="small"
          >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure you want to delete it?"
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger icon={<DeleteOutlined />} size="small" variant="solid" color="red">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    onDelete(id);
    message.success("Successfully deleted");
  };
  return (
    <div>
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "15px", width: "300px" }}
      />

      <Table
        columns={columns}
        dataSource={posts}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default PostTable;
