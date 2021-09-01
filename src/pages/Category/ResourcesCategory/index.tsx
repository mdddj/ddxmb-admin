import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Avatar, Button, Card } from 'antd';
import { coverAntdPageParamModelToRequestParam } from '@/entrys/PageModel';
import { antdTableParamAsT, ParseResultToProTable } from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';
import { GetResourceCategoryList } from '@/services/res_service';

/// 列结构
const columns = (): ProColumns<ResCategory>[] => [
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
];

/**
 * 群组分类列表管理
 * @constructor
 */
const ResourcesCategoryIndex: React.FC = () => {
  // 加载数据
  const fetchDataList = async (params: any, _: any, __: any) => {
    const param = coverAntdPageParamModelToRequestParam(params);
    const result = await GetResourceCategoryList(param, antdTableParamAsT<ResCategory>(params));
    return ParseResultToProTable<ResCategory>(result);
  };

  return (
    <>
      <PageContainer title={'群组管理'}>
        <Card>
          <ProTable<ResCategory> columns={columns()} request={fetchDataList} rowKey={'id'} />
        </Card>
      </PageContainer>
    </>
  );
};

export default ResourcesCategoryIndex;
