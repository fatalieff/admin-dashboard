import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";

const { TextArea } = Input;
function PostModal({ visible, post, onCancel, onSuccess }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (post) {
      form.setFieldValue(post);
    } else {
      form.resetFields();
    }
  }, [post, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSuccess(values);
        form.resetFields();
      })
      .catch((info) => {
        message.error("There is an error in the form.");
      });
  };
  return (
    <Modal
      title={post ? "Edit" : "New Post"}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={post ? "Update" : "Ok"}
      cancelText="Cancel"
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Title required",
            },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          name="body"
          label="Content"
          rules={[
            {
              required: true,
              message: "Content required",
            },
          ]}
        >
          <TextArea rows={6} placeholder="Enter content" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PostModal;
