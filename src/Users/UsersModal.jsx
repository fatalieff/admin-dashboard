import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
const { TextArea } = Input;


function UserModal({visible, onSuccess, onCancel, user}) {
  const [form] = Form.useForm();

  //
  useEffect(() => {
    if (user) {
      form.setFieldValue(user);
    } else {
      form.resetFields();
    }
  }, [user, form]);
  //
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSuccess(values);
        form.resetFields();
      })
      .catch(() => {
        message.error("Error Form");
      });
  };

  return (
    <Modal
      title={user ? "Edit" : "New User"}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      
      cancelText="Cancel"
      width={600}
    >
      <Form form={form} layout="vertical">
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
