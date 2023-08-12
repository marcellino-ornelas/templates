import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Row,
  Col,
  Modal,
  Select,
  Divider,
  Switch,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './playground.module.css';
import { Editors } from './_editors';

interface Props {
  onSubmit: (args: any) => void;
}

export const AddPrompt: React.FC = ({ onSubmit }: Props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const type = Form.useWatch('type', form);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = React.useCallback(() => {
    form.submit();
  }, [form]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = React.useCallback(
    (values) => {
      setIsModalOpen(false);
      onSubmit(values);
      form.setFieldsValue({ type: '', name: '', value: '' });
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
          <Form.Item
            // eslint-disable-next-line react/jsx-props-no-spreading
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
          <Form.Item
            // eslint-disable-next-line react/jsx-props-no-spreading
            label="name"
            name="name"
            rules={[{ required: true, message: 'Please add a name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            // eslint-disable-next-line react/jsx-props-no-spreading
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
