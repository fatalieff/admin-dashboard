import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Table, Button, Space, Input, Popconfirm, Tag } from "antd";
import { useState } from "react";
import { exportToExcel, importFromExcel } from "../utils/excel";

function UsersTable({ onDelete, onEdit, loading, users, onImport }) {
  const [searchText, setSearchText] = useState("");

  const handleExport = () => {
    exportToExcel(users, "UserList");
  };
  const handleImport = async () => {
    try {
      const importedData = await importFromExcel();

      if (importedData && importedData.length > 0) {
        onImport(importedData);
      } else if (importedData === null) {
        console.log("The import was canceled.");
      }
    } catch (error) {
      console.error(
        "Error: File could not be read or is not formatted properly",
        error
      );
    }
  };

  const userColumns = [
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
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record.name.toLowerCase().includes(value.toLowerCase()) ||
          record.username.toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",

      render: (text) => text,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 100,
      render: (userId) => <Tag color="blue"> User {userId}</Tag>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 200,

      render: (text) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",

      render: (text) => text,
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
            onConfirm={() => onDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space
        style={{
          marginBottom: "15px",
          width: "100%",
          justifyContent: "space-between",
        }}
        wrap
      >
        <Input
          placeholder="Search..."
          value={searchText}
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "15px", width: "300px" }}
        />

        <div>
          <Button
            type="default"
            icon={<DownloadOutlined />}
            onClick={handleExport}
            style={{ marginRight: "10px" }}
          >
            Export to Excel
          </Button>

          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={handleImport}
          >
            Import from Excel
          </Button>
        </div>
      </Space>
      <Table
        columns={userColumns}
        pagination={{ pageSize: 10 }}
        rowKey="id"
        loading={loading}
        dataSource={users}
      />
    </div>
  );
}

export default UsersTable;
