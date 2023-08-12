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
import { AddPrompt } from './_addPrompt';
import { SettingsFilePrompt } from 'templates-mo/src/types/settings';
import { init } from '@test/support/cli';

type FieldType = {
  name: string;
  prompts?: SettingsFilePrompt[];
};

interface Props {
  initialState: any;
  onChange: (data: FieldType) => void;
}
export const Options = ({ onChange, initialState }: Props) => {
  const [form] = Form.useForm();

  const onFormChange = React.useCallback(
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
                <AddPrompt onSubmit={(values) => add(values)} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

// export const Options = ({ onChange, initialState }: Props) => {
//   const [form] = Form.useForm();

//   const onFormChange = React.useCallback(
//     (changed, values) => {
//       onChange(values);
//     },
//     [form]
//   );

//   return (
//     <Row justify="center" align="middle">
//       <Form
//         form={form}
//         initialValues={initialState}
//         onValuesChange={onFormChange}
//         style={{ maxWidth: 600 }}
//       >
//         <Form.Item
//           // eslint-disable-next-line react/jsx-props-no-spreading
//           label="name"
//           name="name"
//           required
//         >
//           <Input hidden />
//         </Form.Item>
//         <Divider dashed>Prompts</Divider>
//         <Form.List name="prompts">
//           {(fields, { add, remove }) => (
//             <>
//               {fields.map(({ key, ...field }) => (
//                 <Space key={key} align="baseline">
//                   <Form.Item
//                     // eslint-disable-next-line react/jsx-props-no-spreading
//                     {...field}
//                     hidden
//                     label="type"
//                     name={[field.name, 'type']}
//                   >
//                     <Input hidden />
//                   </Form.Item>
//                   <Form.Item
//                     // eslint-disable-next-line react/jsx-props-no-spreading
//                     {...field}
//                     label="name"
//                     name={[field.name, 'name']}
//                   >
//                     <Input />
//                   </Form.Item>
//                   <Form.Item
//                     // eslint-disable-next-line react/jsx-props-no-spreading
//                     {...field}
//                     label="value"
//                     name={[field.name, 'value']}
//                     valuePropName={
//                       form.getFieldValue(['prompts', field.name, 'type']) ===
//                       'confirm'
//                         ? 'checked'
//                         : 'value'
//                     }
//                   >
//                     {/* eslint-disable-next-line no-nested-ternary */}
//                     {form.getFieldValue(['prompts', field.name, 'type']) ===
//                     'input' ? (
//                       <Input />
//                     ) : form.getFieldValue(['prompts', field.name, 'type']) ===
//                       'confirm' ? (
//                       <Switch />
//                     ) : (
//                       <Input />
//                     )}
//                   </Form.Item>

//                   <MinusCircleOutlined onClick={() => remove(field.name)} />
//                 </Space>
//               ))}
//               <Form.Item>
//                 <AddPrompt onSubmit={(values) => add(values)} />
//               </Form.Item>
//             </>
//           )}
//         </Form.List>
//       </Form>
//     </Row>
//   );
// };
