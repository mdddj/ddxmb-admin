import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Category } from '@/services/models/BlogPushNewResultData';
import {
  DeleteBlogCategory,
  GetCategoryForTableData,
  SaveAndUpdateBlogCategory,
} from '@/services/blog';
import { coverAntdPageParamModelToRequestParam } from '@/entrys/PageModel';
import {
  antdTableParamAsT,
  ParseResultToProTable,
  simpleHandleResultMessage,
} from '@/utils/result';
import { Avatar, Button, DatePicker, Drawer, Form, Input } from 'antd';
import { useBoolean } from '@umijs/hooks';
import TextArea from 'antd/es/input/TextArea';

// 表格列
const columns = (): ProColumns<Category>[] => {
  return [
    {
      title: '分类',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      render: (_, data) => <Avatar src={data.logo} />,
    },
    {
      title: '介绍',
      dataIndex: 'intro',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, data, __, action) => [
        <a onClick={() => action?.startEditable?.(data.id)} key={'edit'}>
          编辑
        </a>,
      ],
    },
  ];
};

/**
 * 博客分类管理
 * @constructor
 */
const BlogCategoryIndex: React.FC = ({}) => {
  const action = useRef<ActionType>();
  const { state, setFalse, setTrue } = useBoolean();

  // 加载数据
  const fetchData = async (params: any, _: any, __: any) => {
    return ParseResultToProTable<Category>(
      await GetCategoryForTableData(
        coverAntdPageParamModelToRequestParam(params),
        antdTableParamAsT<Category>(params),
      ),
    );
  };

  // 编辑表格
  const onEditRow = async (key: any, data: Category, row: any) => {
    const result = await SaveAndUpdateBlogCategory(data);
    await simpleHandleResultMessage(result, undefined, false, action.current?.reload);
  };

  // 删除表格
  const onDelete = async (key: any) => {
    const result = await DeleteBlogCategory(key as number);
    await simpleHandleResultMessage(result, undefined, true, action.current?.reload);
  };

  // 新增
  const addNew = async (values: Category) => {
    const result = await SaveAndUpdateBlogCategory(values);
    await simpleHandleResultMessage(result, (data) => {
      setFalse();
      action.current?.reload();
    });
  };

  return (
    <>
      <PageContainer title={'博客分类管理'}>
        <ProTable<Category>
          actionRef={action}
          request={fetchData}
          rowKey={'id'}
          columns={columns()}
          bordered={true}
          editable={{
            onSave: onEditRow,
            onDelete: onDelete,
          }}
          toolBarRender={() => [
            <Button key={'add'} type={'primary'} onClick={setTrue}>
              新增分类
            </Button>,
          ]}
        />

        <Drawer visible={state} onClose={setFalse} width={1000}>
          <Form layout={'vertical'} onFinish={addNew}>
            <Form.Item label={'分类名'} name={'name'} required={true}>
              <Input />
            </Form.Item>
            <Form.Item label={'Logo'} name={'logo'} required={true}>
              <Input />
            </Form.Item>
            <Form.Item label={'介绍'} name={'intro'} required={true}>
              <TextArea />
            </Form.Item>
            <Form.Item label={'创建时间'} name={'createDate'} required={true}>
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Button htmlType={'submit'} type={'primary'}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </PageContainer>
    </>
  );
};

export default BlogCategoryIndex;
