import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { TextModel } from '@/pages/Text/model';
import { Card, Form, Input, Button, Modal, message } from 'antd';
import { getTextList, saveText } from '@/services/text';
import { responseIsSuccess, simpleHandleResultMessage } from '@/utils/result';
import { PlusOutlined } from '@ant-design/icons';
import { useBoolean } from '@umijs/hooks';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownPreview from '@/widgets/MarkdownPreview';

const columns = (
  onEdit: (model: TextModel) => void,
  onPreview?: (model: TextModel) => void,
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
    title: '操作',
    valueType: 'option',
    render: (text, record, _, __) => [
      <a key="editable" onClick={() => onEdit(record)}>
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view" onClick={() => onPreview?.(record)}>
        查看
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
    const result = await getTextList(params.current - 1, params.pageSize, name);
    return {
      data: result.data.list,
      success: responseIsSuccess(result),
      total: result.data.page.total,
      current: result.data.page.currentPage,
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
    const result = await saveText(text);
    await simpleHandleResultMessage<TextModel>(result, (_) => {
      setFalse();
      actionRef.current?.reload();
    });
  };

  // 正文内容被改变
  const contentChange = (value: string) => {
    setMarkdown(value);
  };

  // 编辑
  const onEdit = (edit: TextModel) => {
    contentChange(edit.context);
    setEditText(edit);
    setTrue();
    form.setFieldsValue({ name: edit.name });
    form.setFieldsValue({ intro: edit.intro });
  };

  // 预览
  const onPreview = (text: TextModel) => {
    setPreviewContent(text.context);
  };

  return (
    <PageContainer title={'字典列表'}>
      <Card>
        <ProTable<TextModel>
          actionRef={actionRef}
          rowKey={'id'}
          columns={columns(onEdit, onPreview)}
          request={fetchData}
          pagination={{ pageSize: 10 }}
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary" onClick={setTrue}>
              新增
            </Button>,
          ]}
        />
      </Card>
      <Modal
        visible={state}
        onCancel={() => {
          setFalse();
          setEditText(undefined);
          setMarkdown('');
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
      </Modal>
      <MarkdownPreview content={previewContent} onClose={() => setPreviewContent('')} />
    </PageContainer>
  );
};

export default TextList;
