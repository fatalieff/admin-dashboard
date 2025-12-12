import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Upload, Avatar } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;

function UserModal({visible, onSuccess, onCancel, user}) {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [fileList, setFileList] = useState([]);

  //
  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
      if (user.avatar) {
        setAvatarUrl(user.avatar);
        setFileList([{
          uid: '-1',
          name: 'avatar.png',
          status: 'done',
          url: user.avatar,
        }]);
      } else {
        setAvatarUrl(null);
        setFileList([]);
      }
    } else {
      form.resetFields();
      setAvatarUrl(null);
      setFileList([]);
    }
  }, [user, form]);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAvatarChange = async (info) => {
    const { file, fileList } = info;
    
    if (file.status === 'removed') {
      setAvatarUrl(null);
      form.setFieldsValue({ avatar: null });
      setFileList([]);
      return;
    }

    
    if (fileList.length > 0) {
      const lastFile = fileList[fileList.length - 1];
      const fileObj = lastFile.originFileObj || lastFile;
      
      if (fileObj && fileObj instanceof File) {
        try {
          const base64 = await getBase64(fileObj);
          setAvatarUrl(base64);
          form.setFieldsValue({ avatar: base64 });
          
          
          const updatedFileList = fileList.map(f => {
            if (f.uid === lastFile.uid) {
              return {
                ...f,
                status: 'done',
                url: base64,
              };
            }
            return f;
          });
          setFileList(updatedFileList);
        } catch (error) {
          console.error('Error uploading image:', error);
          message.error('Error uploading image');
        }
      } else {
        
        setFileList(fileList);
      }
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Only images can be uploaded');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be less than 2MB');
      return Upload.LIST_IGNORE;
    }
    return false; 
  };

  //
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        
        const formValues = {
          ...values,
          avatar: avatarUrl || form.getFieldValue('avatar') || null
        };
        onSuccess(formValues);
        form.resetFields();
        setAvatarUrl(null);
        setFileList([]);
      })
      .catch(() => {
        message.error("Error Form");
      });
  };

  return (
    <Modal
      title={user ? "Edit" : "New User"}
      open={visible}
      onCancel={() => {
        form.resetFields();
        setAvatarUrl(null);
        setFileList([]);
        onCancel();
      }}
      onOk={handleSubmit}
      
      cancelText="Cancel"
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="avatar"
          label="Avatar"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Avatar
              size={100}
              src={avatarUrl}
              icon={<UserOutlined />}
              style={{ marginBottom: '8px' }}
            />
            <Upload
              name="avatar"
              listType="picture-card"
              fileList={fileList}
              onChange={handleAvatarChange}
              beforeUpload={beforeUpload}
              maxCount={1}
              accept="image/*"
            >
              {fileList.length < 1 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </div>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Name Required!",
            },
          ]}
        >
          <Input placeholder="Enter Name" />
        </Form.Item>
         <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Username Required!",
            },
          ]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Email Required!",
            },
          ]}
        >
          <Input placeholder="Enter Email" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserModal;
