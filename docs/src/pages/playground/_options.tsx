import React from 'react';
import { Form, FormProps, Input, Space, Row, Col, Divider, Switch } from 'antd';
// import { SettingsFilePrompt } from 'templates-mo/src/types/settings';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MinusCircleOutlined } from '@ant-design/icons';
import { PlaygroundPrompt, PlaygroundTps } from '@site/types/playground';
import { AddPrompt } from './_addPrompt';

interface Props {
  initialState: Partial<PlaygroundTps>;
  onChange: (data: PlaygroundTps) => void;
}

export const Options = ({ onChange, initialState }: Props) => {
  const [form] = Form.useForm<PlaygroundTps>();

  const onFormChange: FormProps<PlaygroundTps>['onValuesChange'] =
    React.useCallback(
      (changed, values) => {
        onChange(values);
      },
      [form]
    );

  return (
    <div className="container">
      <Form
        form={form}
        initialValues={initialState}
        onValuesChange={onFormChange}
      >
        <Form.Item
          // eslint-disable-next-line react/jsx-props-no-spreading
          label="name"
          name="name"
          required
        >
          <Input hidden />
        </Form.Item>

        <Divider>Prompts</Divider>

        <Form.List name="prompts">
          {(fields, { add, remove }) => (
            <>
              <Row>
                {fields.map(({ key, ...field }) => (
                  <Col xs={24} md={12}>
                    <Space key={key} align="baseline">
                      <Form.Item
                        {...field}
                        hidden
                        label="type"
                        name={[field.name, 'type']}
                      >
                        <Input hidden />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="name"
                        name={[field.name, 'name']}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="value"
                        name={[field.name, 'value']}
                        valuePropName={
                          form.getFieldValue([
                            'prompts',
                            field.name,
                            'type',
                          ]) === 'confirm'
                            ? 'checked'
                            : 'value'
                        }
                      >
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {form.getFieldValue(['prompts', field.name, 'type']) ===
                        'input' ? (
                          <Input />
                        ) : form.getFieldValue([
                            'prompts',
                            field.name,
                            'type',
                          ]) === 'confirm' ? (
                          <Switch />
                        ) : (
                          <Input />
                        )}
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  </Col>
                ))}
              </Row>
              <Form.Item>
                <AddPrompt
                  onSubmit={(values: PlaygroundPrompt) => add(values)}
                />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};
