import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined } from '@ant-design/icons';
import { PlaygroundPrompt } from '@site/types/playground';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: PlaygroundPrompt) => any;
}

export const AddPrompt = ({ onSubmit }: Props) => {
  const [form] = Form.useForm<PlaygroundPrompt>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const type = Form.useWatch('type', form);

  const showModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = React.useCallback(() => {
    form.submit();
  }, [form]);

  const handleCancel = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onFinish = React.useCallback(
    (values: PlaygroundPrompt) => {
      setIsModalOpen(false);
      onSubmit(values);
      form.setFieldsValue({
        type: '',
        name: '',
        value: '',
      } as unknown as PlaygroundPrompt);
    },
    [onSubmit]
  );

  return (
    <>
      <Button type="dashed" onClick={showModal} block icon={<PlusOutlined />}>
        Add Prompt
      </Button>
      <Modal
        title="Add Prompt"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish} initialValues={{ values: '' }}>
          <Form.Item<PlaygroundPrompt>
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select a type!' }]}
          >
            <Select
              onChange={(value) =>
                value === 'confirm' && form.setFieldValue('value', false)
              }
              options={[
                { value: 'input', label: 'Input' },
                { value: 'list', label: 'List' },
                { value: 'confirm', label: 'Confirm' },
              ]}
            />
          </Form.Item>
          <Form.Item<PlaygroundPrompt>
            label="name"
            name="name"
            rules={[{ required: true, message: 'Please add a name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<PlaygroundPrompt>
            label="Value"
            name="value"
            hidden={!type}
            required
            valuePropName={type === 'confirm' ? 'checked' : 'value'}
          >
            {/* eslint-disable-next-line no-nested-ternary*/}
            {type === 'input' ? (
              <Input />
            ) : type === 'confirm' ? (
              <Switch />
            ) : (
              <Input />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
