import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import React from 'react';
import { User } from 'dd_server_api_web/apis/model/UserModel';
import Api from '@/utils/request';
import { coverAntdPageParamModelToRequestParam } from 'dd_server_api_web/apis/model/PageModel';
import { antdTableParamAsT, ParseResultToProTable } from 'dd_server_api_web/apis/utils/ResultUtil';

const columns = (): ProColumns<User>[] => {
  return [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'loginNumber',
      title: '用户名',
    },
    {
      dataIndex: 'nickName',
      title: '昵称',
    },
  ];
};

const UserListView: React.FC = () => {
  /// 加载数据
  const fetchUserData = async (params: any) => {
    const result = await Api.getInstance().userList(
      coverAntdPageParamModelToRequestParam(params),
      antdTableParamAsT<User>(params),
    );
    return ParseResultToProTable<User>(result);
  };

  return (
    <PageContainer>
      <ProTable<User> request={fetchUserData} columns={columns()} rowKey={'id'} />
    </PageContainer>
  );
};
export default UserListView;
