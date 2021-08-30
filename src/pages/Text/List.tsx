import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { TextModel } from '@/pages/Text/model';
import { Button, Card } from 'antd';
import { getTextList } from '@/services/text';
import { ParseResultToProTable } from '@/utils/result';
import { PlusOutlined } from '@ant-design/icons';

const columns: ProColumns<TextModel>[] = [
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
    dataIndex: 'desc',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
];

/// 关键字列表
const TextList: React.FC = () => {
  const fetchData = async (params: any, sort: any, filter: any) => {
    const result = await getTextList(params.current - 1, params.pageSize);
    return ParseResultToProTable(result);
  };

  return (
    <PageContainer title={'字典列表'}>
      <Card>
        <ProTable<TextModel>
          columns={columns}
          request={fetchData}
          pagination={{ pageSize: 10 }}
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新增
            </Button>,
          ]}
        ></ProTable>
      </Card>
    </PageContainer>
  );
};

export default TextList;
