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
      width: 60,
      className: "small-mobile-hide",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "mobile-hide",
      minWidth: 100,
      render: (text) => {
        const nameText = text || '';
        return nameText.length > 15 ? `${nameText.substring(0, 15)}...` : nameText;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      minWidth: 120,
      render: (text) => {
        const emailText = text || '';
        return emailText.length > 20 ? `${emailText.substring(0, 20)}...` : emailText;
      },
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
      minWidth: 150,
      render: (text) => {
        const bodyText = text || '';
        return <strong>{bodyText.length > 40 ? `${bodyText.substring(0, 40)}...` : bodyText}</strong>;
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
      {" "}
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
            columns={commentsColumn}
            dataSource={comments}
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
    </div>
  );
}

export default CommentsTable;
