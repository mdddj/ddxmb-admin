import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Category } from '@/services/models/BlogPushNewResultData';
import { GetCategoryForTableData, SaveAndUpdateBlogCategory } from '@/services/blog';
import { coverAntdPageParamModelToRequestParam } from '@/entrys/PageModel';
import {
  antdTableParamAsT,
  ParseResultToProTable,
  simpleHandleResultMessage,
} from '@/utils/result';
import { Avatar } from 'antd';

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

  // 加载数据
  const fetchData = async (params: any, _: any, __: any) => {
    const result = await GetCategoryForTableData(
      coverAntdPageParamModelToRequestParam(params),
      antdTableParamAsT<Category>(params),
    );
    return ParseResultToProTable<Category>(result);
  };

  // 编辑表格
  const onEditRow = async (key: any, data: Category, row: any) => {
    const result = await SaveAndUpdateBlogCategory(data);
    await simpleHandleResultMessage(result, (_) => {}, false, action.current?.reload);
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
          }}
        />
      </PageContainer>
    </>
  );
};

export default BlogCategoryIndex;
