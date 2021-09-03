import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Layout, Tree } from 'antd';
import { useMount } from '@umijs/hooks';
import { GetFolders } from '@/services/file_service';
import { simpleHandleResultMessage } from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

// 文件列表
const FilesPage: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [folders, setFolders] = useState<ResCategory[]>([]);

  //
  useMount(async () => {
    const result = await GetFolders();
    await simpleHandleResultMessage<ResCategory[]>(
      result,
      (data) => {
        const nodes = treeCovertToNode(data);
        setTreeData(nodes);
        setFolders(data);
      },
      false,
    );
  });

  const treeCovertToNode = (list: ResCategory[]): DataNode[] => {
    return list.map((item) => {
      return {
        title: item.name,
        key: item.id.toString(),
        isLeaf: item.childers?.length !== 0,
      };
    });
  };

  const onSelect = (keys: any) => {
    console.log(keys);
  };

  const onRightClick = ({ event, node }) => {
    console.log(node);
  };

  return (
    <PageContainer>
      <Layout>
        <Sider theme={'light'}>
          <Tree treeData={treeData} onSelect={onSelect} onRightClick={onRightClick}></Tree>
        </Sider>
        <Content></Content>
      </Layout>
    </PageContainer>
  );
};
export default FilesPage;
