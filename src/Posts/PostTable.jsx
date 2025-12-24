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
      width: 60,
      className: "small-mobile-hide",
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
      render: (text) => {
        const titleText = text || '';
        return <strong>{titleText.length > 30 ? `${titleText.substring(0, 30)}...` : titleText}</strong>;
      },
      minWidth: 150,
    },
    {
      title: "Content",
      dataIndex: "body",
      key: "body",
      className: "mobile-hide",
      minWidth: 200,
      render: (text) => {
        const bodyText = text || '';
        return bodyText.length > 50 ? `${bodyText.substring(0, 50)}...` : bodyText;
      },
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 80,
      className: "small-mobile-hide",
      render: (userId) => <Tag color="blue" size="small">U{userId}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            size="small"
          >
            <span className="small-mobile-hide">Edit</span>
          </Button>

          <Popconfirm
            title="Are you sure you want to delete it?"
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger icon={<DeleteOutlined />} size="small" variant="solid" color="red">
              <span className="small-mobile-hide">Delete</span>
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
        style={{ marginBottom: "15px", width: 250 }}
      />

      <div className="responsive-table-container">
        <Table
          columns={columns}
          dataSource={posts}
          loading={loading}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: false,
            simple: true
          }}
          scroll={{ x: 'max-content' }}
          size="small"
        />
      </div>
    </div>
  );
}

export default PostTable;
