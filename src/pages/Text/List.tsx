import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { TextModel } from '@/pages/Text/model';
import { Card, Form, Input, Button, message, Drawer, Checkbox, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useBoolean } from '@umijs/hooks';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownPreview from '@/widgets/MarkdownPreview';
import Api from '@/utils/request';
import { responseIsSuccess, successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';

const columns = (
  onEdit: (model: TextModel) => void,
  onPreview?: (model: TextModel) => void,
  onSelectOriginPassword?: (model: TextModel) => void,
): ProColumns<TextModel>[] => [
  {
    title: '关键字',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    tip: '这个字段是唯一的',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入关键字查询',
        },
      ],
    },
  },
  {
    title: '描述',
    dataIndex: 'intro',
    ellipsis: true,
    search: false,
  },
  {
    title: '加密',
    dataIndex: 'isEncryptionText',
    render: (_, record) => (
      <Checkbox checked={record.isEncryptionText} disabled={!record.isEncryptionText} />
    ),
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, __) => [
      <a key="editable" onClick={() => onEdit(record)}>
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view" onClick={() => onPreview?.(record)}>
        查看
      </a>,
      <a
        target="_blank"
        rel="noopener noreferrer"
        key="view"
        onClick={() => onSelectOriginPassword?.(record)}
      >
        原始密码
      </a>,
    ],
  },
];

/// 关键字列表
const TextList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { setFalse, setTrue, state } = useBoolean(false);
  const [editText, setEditText] = useState<TextModel>();
  const [markdown, setMarkdown] = useState<string>('');
  const [previewContent, setPreviewContent] = useState<string>('');
  const [form] = Form.useForm();

  // 加载数据
  const fetchData = async (params: any, _: any, __: any) => {
    const name = params.name;
    const result = await Api.getInstance().getTextList(params.current - 1, params.pageSize, name);
    return {
      data: result.data?.list,
      success: responseIsSuccess(result),
      total: result.data?.page.total,
      current: result.data?.page.currentPage,
    };
  };

  // 提交表单
  const onFinish = async (values: any) => {
    console.log(values);
    if (markdown.length == 0) {
      message.error('请输入正文内容');
      return;
    }
    const text = values as TextModel;
    text.context = markdown;
    if (editText) {
      text.id = editText.id;
    }
    const result = await Api.getInstance().saveText(text);
    successResultHandle(
      result,
      (_) => {
        setFalse();
        actionRef.current?.reload();
        message.success(result.message);
      },
      message.error,
    );
  };

  // 正文内容被改变
  const contentChange = (value: string) => {
    setMarkdown(value);
  };

  // 编辑
  const onEdit = (edit: TextModel) => {
    setTrue();
    contentChange(edit.context);
    setEditText(edit);
    form.setFieldsValue(edit);
  };

  // 预览
  const onPreview = (text: TextModel) => {
    setPreviewContent(text.context);
  };

  // 查询原始密码
  const onSelectOriginPassword = (text: TextModel) => {
    Api.getInstance()
      .adminSelectTextOriginPassword(text.name)
      .then((v) => {
        successResultHandle(
          v,
          (d) => {
            Modal.success({ content: d });
          },
          message.error,
        );
      });
  };

  return (
    <PageContainer title={'字典列表'}>
      <Card>
        <ProTable<TextModel>
          actionRef={actionRef}
          rowKey={'id'}
          columns={columns(onEdit, onPreview, onSelectOriginPassword)}
          request={fetchData}
          pagination={{ pageSize: 10 }}
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary" onClick={setTrue}>
              新增
            </Button>,
          ]}
        />
      </Card>
      <Drawer
        visible={state}
        onClose={() => {
          setEditText(undefined);
          setMarkdown('');
          setFalse();
        }}
        title={'新增'}
        footer={null}
        width={1000}
      >
        <Form layout={'vertical'} onFinish={onFinish} form={form}>
          <Form.Item
            label="关键词"
            name="name"
            initialValue={editText?.name}
            rules={[{ required: true, message: '请输入关键词!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="intro" initialValue={editText?.intro}>
            <Input />
          </Form.Item>
          <Form.Item
            name="isEncryptionText"
            valuePropName="checked"
            tooltip={'如果开启这个设置,则需要输入解密的密码'}
          >
            <Checkbox>加密内容</Checkbox>
          </Form.Item>

          <Form.Item
            label="密码"
            name={'viewPassword'}
            tooltip={'如果开启了加密的选项,则这个是必填项'}
          >
            <Input />
          </Form.Item>
          <Form.Item label={'正文'}>
            <MarkdownEditor
              height={300}
              value={markdown}
              onChange={(editor: any, data: any, value: string) => contentChange(value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <MarkdownPreview content={previewContent} onClose={() => setPreviewContent('')} />
    </PageContainer>
  );
};

export default TextList;
