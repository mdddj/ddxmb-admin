import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Card, Col, Row, Tree } from 'antd';
import { useMount } from '@umijs/hooks';
import { GetFolders } from '@/services/file_service';
import { simpleHandleResultMessage } from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';
import { FolderFilled } from '@ant-design/icons';

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

// 文件列表
const FilesPage: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);

  //
  useMount(async () => {
    const result = await GetFolders();
    await simpleHandleResultMessage<ResCategory[]>(
      result,
      (data) => {
        const nodes = treeCovertToNode(result.data);
        setTreeData(nodes);
      },
      false,
    );
  });

  const treeCovertToNode = (list: ResCategory[]): DataNode[] => {
    return list.map((item) => {
      return {
        title: item.name,
        key: item.name,
        isLeaf: item.childers?.length !== 0,
      };
    });
  };

  const onSelect = (keys: any) => {
    console.log(keys);
  };

  return (
    <PageContainer>
      <Row gutter={12}>
        <Col span={6}>
          <Card>
            <Tree treeData={treeData} switcherIcon={<FolderFilled />} onSelect={onSelect}></Tree>
          </Card>
        </Col>

        <Col span={18}>
          <Card></Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default FilesPage;
