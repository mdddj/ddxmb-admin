import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Avatar, Button, Card, Drawer, Form, Input } from 'antd';
import { coverAntdPageParamModelToRequestParam } from '@/entrys/PageModel';
import {
  antdTableParamAsT,
  ParseResultToProTable,
  simpleHandleResultMessage,
} from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';
import { GetResourceCategoryList, SaveOrUpdateResourceCategory } from '@/services/res_service';
import { useBoolean } from '@umijs/hooks';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarginRight from '@/widgets/MarginRight';

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
  const { state, setFalse, setTrue } = useBoolean(false);
  const [markdown, setMarkdown] = useState<string>('');
  const [adding, setAdding] = useState<boolean>(false);

  // 加载数据
  const fetchDataList = async (params: any, _: any, __: any) => {
    const param = coverAntdPageParamModelToRequestParam(params);
    const result = await GetResourceCategoryList(param, antdTableParamAsT<ResCategory>(params));
    return ParseResultToProTable<ResCategory>(result);
  };

  // 提交数据
  const submit = async (values: any) => {
    setAdding(true);
    console.log(values);
    const result = await SaveOrUpdateResourceCategory(values as ResCategory);
    await simpleHandleResultMessage(result);
    setAdding(false);
  };

  return (
    <>
      <PageContainer title={'群组管理'}>
        <Card>
          <ProTable<ResCategory>
            columns={columns()}
            request={fetchDataList}
            rowKey={'id'}
            toolBarRender={() => {
              return [<Button onClick={setTrue}>新增群组</Button>];
            }}
          />
        </Card>
        <Drawer visible={state} title={'新增分类'} width={720} onClose={setFalse}>
          <Form layout={'vertical'} onFinish={submit}>
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
            <Form.Item label={'介绍'}>
              <MarkdownEditor
                height={200}
                value={markdown}
                onChange={(edit: any, data: any, value: string) => setMarkdown(value)}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType={'submit'} type={'primary'} loading={adding}>
                提交
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
