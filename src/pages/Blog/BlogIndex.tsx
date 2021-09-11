import * as React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Card, message } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import InputDailog from '@/pages/Components/inputdialog/InputDialog';
import { useState } from 'react';
import { Chip } from '@material-ui/core';
import { Link } from 'umi';
import Api from '@/utils/request';
import { BlogData } from 'dd_server_api_web/apis/model/result/BlogPushNewResultData';

// 博客列表首页

export default (): React.ReactNode => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const BlogTableColumn: ProColumns<BlogData>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '分类',
      dataIndex: 'category',
      render: (_, obj) => {
        return (
          <Chip
            avatar={<Avatar alt="Natacha" src={obj.category.logo} />}
            label={obj.category.name}
            variant="outlined"
          />
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, obj, _, action) => [
        <Link
          key={'previewKey'}
          to={{
            pathname: '/blog/preview',
            search: '?id=' + obj.id,
          }}
        >
          预览
        </Link>,
        <Link
          key={'editKey'}
          to={{
            pathname: '/blog/write',
            search: '?id=' + obj.id,
          }}
        >
          编辑
        </Link>,
        <a
          key="edit"
          onClick={() => {
            setShowDialog(true);
          }}
        >
          修改头图
        </a>,
        <a key="delete" onClick={() => deleteBlogFun(obj.id)}>
          删除
        </a>,
      ],
    },
  ];

  // 删除博客
  const deleteBlogFun = async (id: number) => {
    console.log('删除博客' + id);
    await Api.getInstance().deleteBlog(id);
    message.success('删除成功');
  };

  return (
    <>
      <PageContainer>
        <Card>
          <ProTable<BlogData>
            columns={BlogTableColumn}
            rowKey={'id'}
            request={async (params) => {
              const data = await Api.getInstance().getBlogList(
                params.current ?? 0,
                params.pageSize ?? 10,
              );
              return {
                data: data.data?.list,
                success: data && data.state == 200,
                total: data.data?.page?.total ?? 0,
              };
            }}
          />

          <InputDailog
            onOk={(value) => {
              console.log(value);
            }}
            show={showDialog}
          />
        </Card>

        {/* 预览组件 */}
      </PageContainer>
    </>
  );
};
