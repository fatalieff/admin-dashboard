import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
  DownloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Table, Button, Space, Input, Popconfirm, Tag, Avatar } from "antd";
import { useState } from "react";
import { exportToExcel, importFromExcel } from "../utils/excel";


function UsersTable({ onDelete, onEdit, loading, users, onImport }) {
  const [searchText, setSearchText] = useState("");
//Excel
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
//Table 
  const userColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      className: "small-mobile-hide",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: 50,
      render: (avatar) => <Avatar size="small" src={avatar} icon={<UserOutlined />} />,
      className: "mobile-hide",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record.name.toLowerCase().includes(value.toLowerCase()) ||
          record.username.toLowerCase().includes(value.toLowerCase()) ||
          record.email.toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text) => <strong>{text}</strong>,
      minWidth: 120,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      className: "mobile-hide",
      minWidth: 100,
      render: (text) => text,
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      minWidth: 150,
      render: (text) => {
        const emailText = text || '';
        return emailText.length > 20 ? `${emailText.substring(0, 20)}...` : emailText;
      },
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
            onConfirm={() => onDelete(record.id)}
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
              <span className="small-mobile-hide">Delete</span>
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
          style={{ marginBottom: "15px", width: 250 }}
        />

        <div>
          <Button
            type="default"
            icon={<DownloadOutlined />}
            onClick={handleExport}
            style={{ marginRight: "10px" }}
            className="mobile-hide"
          >
            <span className="small-mobile-hide">Export to Excel</span>
          </Button>

          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={handleImport}
            className="small-mobile-hide"
          >
            <span className="mobile-hide">Import from Excel</span>
          </Button>
        </div>
      </Space>
      <div className="responsive-table-container">
        <Table
          columns={userColumns}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: false,
            simple: true
          }}
          rowKey="id"
          loading={loading}
          dataSource={users}
          scroll={{ x: 'max-content' }}
          size="small"
        />
      </div>
    </div>
  );
}

export default UsersTable;
