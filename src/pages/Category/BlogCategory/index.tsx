import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Avatar, Button, DatePicker, Drawer, Form, Input } from 'antd';
import { useBoolean } from '@umijs/hooks';
import TextArea from 'antd/es/input/TextArea';
import { Category } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';
import {
  antdTableParamAsT,
  ParseResultToProTable,
  simpleHandleResultMessage,
} from 'dd_server_api_web/apis/utils/ResultUtil';
import Api from '@/utils/request';
import { coverAntdPageParamModelToRequestParam } from 'dd_server_api_web/apis/model/PageModel';

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
    const pager = coverAntdPageParamModelToRequestParam(params);
    console.log(antdTableParamAsT<Category>(params));
    return ParseResultToProTable<Category>(
      await Api.getInstance().getCategoryForTableData(pager, antdTableParamAsT<Category>(params)),
    );
  };

  // 编辑表格
  const onEditRow = async (key: any, data: Category, _: any) => {
    const result = await Api.getInstance().saveAndUpdateBlogCategory(data);
    await simpleHandleResultMessage(result, undefined, false, (_) => action.current?.reload);
  };

  // 删除表格
  const onDelete = async (key: any) => {
    const result = await Api.getInstance().deleteBlogCategory(key as number);
    await simpleHandleResultMessage(result, undefined, true, (_) => action.current?.reload);
  };

  // 新增
  const addNew = async (values: Category) => {
    const result = await Api.getInstance().saveAndUpdateBlogCategory(values);
    await simpleHandleResultMessage(result, (_) => {
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
