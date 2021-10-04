import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Avatar, Button, Card, Drawer, Form, Input, Popconfirm, Space } from 'antd';
import { useBoolean } from '@umijs/hooks';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarginRight from '@/widgets/MarginRight';
import { ResCategory } from 'dd_server_api_web/apis/model/ResCategory';
import Api from '@/utils/request';
import {
  antdTableParamAsT,
  ParseResultToProTable,
  simpleHandleResultMessage,
} from 'dd_server_api_web/apis/utils/ResultUtil';
import { coverAntdPageParamModelToRequestParam } from 'dd_server_api_web/apis/model/PageModel';

/// 列结构
const columns = (
  onEdit: (category: ResCategory) => void,
  onDelete?: (data: ResCategory) => void,
): ProColumns<ResCategory>[] => [
  {
    title: '群组名',
    dataIndex: 'name',
    copyable: true,
  },
  {
    title: 'logo',
    dataIndex: 'logo',
    render: (_, data) => {
      return <Avatar src={data.logo} />;
    },
    search: false,
  },
  {
    title: '介绍',
    dataIndex: 'description',
    ellipsis: true,
    search: false,
  },
  {
    title: '置顶公告',
    dataIndex: 'announcement',
    render: (_, data) => {
      if (data.announcement) {
        return <a>去查看</a>;
      }
      return <Button>设置公告</Button>;
    },
    search: false,
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (_, data) => [
      <a key={'edit'} onClick={() => onEdit?.(data)}>
        编辑
      </a>,
      <Popconfirm
        title={'如果该群组下存在资源没有被清理,将会删除失败. 确定删除该群组吗? '}
        onConfirm={() => {
          onDelete?.(data);
        }}
        key={'del'}
      >
        <a>删除</a>
      </Popconfirm>,
    ],
  },
];

/**
 * 群组分类列表管理
 * @constructor
 */
const ResourcesCategoryIndex: React.FC = () => {
  const { state, setFalse, setTrue } = useBoolean(false);
  const [markdown, setMarkdown] = useState<string>('');
  const [adding, setAdding] = useState<boolean>(false);
  const [updateResCategory, setUpdateResCategory] = useState<ResCategory>();
  const tableRef = useRef<ActionType>();
  const [form] = Form.useForm();

  // 加载数据
  const fetchDataList = async (params: any, _: any, __: any) => {
    const param = coverAntdPageParamModelToRequestParam(params);
    const result = await Api.getInstance().getResourceCategoryList(
      param,
      antdTableParamAsT<ResCategory>(params),
    );
    return ParseResultToProTable<ResCategory>(result);
  };

  // 提交数据
  const submit = async (values: any) => {
    setAdding(true);
    const object = values as ResCategory;
    object.description = markdown;
    if (updateResCategory) object.id = updateResCategory.id;
    const result = await Api.getInstance().saveOrUpdateResourceCategory(object);
    await simpleHandleResultMessage(result, () => {
      setFalse(); // 关闭抽屉
      tableRef?.current?.reload(); // 刷新表格
    });
    setAdding(false);
  };

  // 编辑
  const onEdit = (resCategory: ResCategory) => {
    setTrue(); // 开启抽屉
    setMarkdown(resCategory.description);
    form.setFieldsValue(resCategory);
    setUpdateResCategory(resCategory);
  };

  // 删除
  const onDelete = async (category: ResCategory) => {
    const result = await Api.getInstance().deleteResourceCategoryById(category);
    await simpleHandleResultMessage<string>(result, () => {
      tableRef?.current?.reload();
    });
  };

  return (
    <>
      <PageContainer title={'群组管理'}>
        <Card>
          <ProTable<ResCategory>
            columns={columns(onEdit, onDelete)}
            request={fetchDataList}
            rowKey={'id'}
            actionRef={tableRef}
            toolBarRender={() => {
              return [
                <Button onClick={setTrue} key={'add'} type={'primary'}>
                  新增群组
                </Button>,
              ];
            }}
          />
        </Card>
        <Drawer
          visible={state}
          title={updateResCategory ? '修改群组信息' : '新增群组'}
          width={720}
          onClose={() => {
            setFalse();
            if (updateResCategory) {
              setUpdateResCategory(undefined);
              form.resetFields();
              setMarkdown('');
            }
          }}
        >
          <Form layout={'vertical'} onFinish={submit} form={form}>
            <Form.Item
              label={'群组名'}
              name={'name'}
              rules={[
                {
                  required: true,
                  message: '请输入群组名',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={'Logo'}
              name={'logo'}
              rules={[
                {
                  required: true,
                  message: '请输入Logo',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={'类型'}
              name={'type'}
              rules={[
                {
                  required: true,
                  message: '请输入群组类型',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Space>
              <Button
                onClick={() => {
                  form.setFieldsValue({ type: 'folder' });
                }}
              >
                文件夹类型
              </Button>
              <Button
                onClick={() => {
                  form.setFieldsValue({ type: 'images' });
                }}
              >
                相册类型
              </Button>
            </Space>

            <Form.Item label={'介绍'}>
              <MarkdownEditor
                height={200}
                value={markdown}
                onChange={(edit: any, data: any, value: string) => setMarkdown(value)}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType={'submit'} type={'primary'} loading={adding}>
                {updateResCategory ? '修改群组信息' : '创建群组'}
              </Button>
              <MarginRight />
              <Button onClick={setFalse}>取消</Button>
            </Form.Item>
          </Form>
        </Drawer>
      </PageContainer>
    </>
  );
};

export default ResourcesCategoryIndex;
