import { Table, Button, Input, Popconfirm, Tag, message, Space } from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
function CommentsTable({ comments, loading, onEdit, onDelete }) {
  const [searchText, setSearchText] = useState("");

  const commentsColumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (text) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",

      render: (text) => text,
    },
    {
      title: "Comments",
      dataIndex: "body",
      key: "body",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record.name?.toLowerCase().includes(value.toLowerCase()) ||
          record.body?.toLowerCase().includes(value.toLowerCase()) ||
          record.email?.toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text) => <strong>{text}</strong>,
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
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              variant="solid"
              color="red"
            >
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
      {" "}
      <div>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "15px", width: "300px" }}
        />

        <Table
          columns={commentsColumn}
          dataSource={comments}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
}

export default CommentsTable;
