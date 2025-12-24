import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";

const { TextArea } = Input;
function CommentsModal({visible , comment , onCancel ,onSuccess}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (comment) {
      form.setFieldsValue(comment);
    } else {
      form.resetFields();
    }
  }, [comment, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSuccess(values);
        form.resetFields();
      })
      .catch(() => {
        message.error("There is an error in the form.");
      });
  };
  return (
    <Modal
    title={comment ? "Edit Comment" : "New Comment"}
    open={visible}
    onCancel={onCancel}
    onOk={handleSubmit}
    okText={comment ? "Update" : "Ok"}
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
            message: "Name required",
          },
        ]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Email required",
          },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item
        name="body"
        label="Comment"
        rules={[
          {
            required: true,
            message: "Comment required",
          },
        ]}
      >
        <TextArea rows={6} placeholder="Enter comment" />
      </Form.Item>
    </Form>
  </Modal>
  )
}

export default CommentsModal