import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { TextModel } from '@/pages/Text/model';
import { Card } from 'antd';
import { getTextList } from '@/services/text';

const columns: ProColumns<TextModel>[] = [
  {
    title: '关键字',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    tip: '关键字提示',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
];

/// 关键字列表
const TextList: React.FC = () => {
  const fetchData = async (params: any, sort, filter) => {
    console.log(params);
    return getTextList(params.current, params.pageSize);
  };

  return (
    <PageContainer title={'字典列表'}>
      <Card></Card>
    </PageContainer>
  );
};

export default TextList;
