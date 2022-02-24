import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Breadcrumb, Button, Card, Col, Input, Modal, Row } from 'antd';
import { useMount } from '@umijs/hooks';
import { FileInfo } from '@/entrys/FileInfo';
import { FileFilled, FolderFilled } from '@ant-design/icons';
import { useRequest } from '@@/plugin-request/request';
import Api from '@/utils/request';
import { simpleHandleResultMessage } from 'dd_server_api_web/apis/utils/ResultUtil';
import { ResCategory } from 'dd_server_api_web/apis/model/ResCategory';

interface NavLink {
  id: number;
  name: string;
}

// 文件列表
const FilesPage: React.FC = () => {
  const [folders, setFolders] = useState<ResCategory[]>([]);
  const [currFolder, setCueeFolder] = useState<ResCategory>();
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [createFolderName, setCreateFolderName] = useState<string>('');
  const [navs, setNavs] = useState<NavLink[]>([]);

  // 组件挂载完成
  useMount(async () => {
    await getFolders();
  });

  /// 获取文件夹列表
  const getFolders = async (id?: number) => {
    const result = await Api.getInstance().getFolders(id);
    await simpleHandleResultMessage<ResCategory[]>(
      result,
      (data) => {
        setFolders(data ?? []);
      },
      false,
    );
  };

  // 选中某个文件夹
  const onSelect = async (item: ResCategory) => {
    setCueeFolder(item);
    await getFolders(item.id);
    const result = await Api.getInstance().getFilesWithFolderId(item.id, { page: 0, pageSize: 10 });
    await simpleHandleResultMessage(
      result,
      (data) => {
        setFiles(data!.list);
      },
      false,
    );
    if (currFolder) {
      const navs = generNav(currFolder, []);
      console.log(navs);
      setNavs(navs);
    }
  };

  const createService = (name: string) => {
    return Api.getInstance().createFolder(name, currFolder);
  };

  const { loading, run } = useRequest(createService, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // 创建新文件夹
  const createFolder = async () => {
    await run(createFolderName);
  };

  /// 生成导航列表的方法
  const generNav = (cate: ResCategory, list: NavLink[]): NavLink[] => {
    const nav = { id: cate.id, name: cate.name } as NavLink;
    list.unshift(nav);
    if (cate.parentNode) {
      return generNav(cate.parentNode, list);
    }
    return list;
  };

  return (
    <PageContainer>
      {/* 操作区域 */}
      <Card
        extra={[
          <Button key={'create-folder'} onClick={() => setOpen(true)}>
            创建文件夹
          </Button>,
        ]}
      >
        {navs.length != 0 && (
          <Breadcrumb>
            {navs.map((item) => (
              <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}
      </Card>

      <Row gutter={12}>
        {folders.map((item) => (
          <Col span={4} key={item.id}>
            <Card hoverable={true} onClick={() => onSelect(item)}>
              <div>
                <FolderFilled style={{ fontSize: 40, color: 'blue' }} />
              </div>
              <div>{item.name}</div>
            </Card>
          </Col>
        ))}

        {files.map((item) => (
          <Col span={4} key={item.id}>
            <Card hoverable={true}>
              <FileFilled style={{ fontSize: 40, color: 'gray' }} />
              <div>{item.fileName}</div>
            </Card>
          </Col>
        ))}
      </Row>

      {/*  创建文件夹弹窗 */}
      <Modal visible={open} onCancel={() => setOpen(false)}>
        <h1>创建文件夹</h1>
        <Input
          autoFocus
          id="name"
          value={createFolderName}
          type="text"
          onChange={(event) => setCreateFolderName(event.target.value)}
        />
        <Button onClick={() => setOpen(false)}>取消</Button>
        <Button onClick={createFolder} type={'primary'} loading={loading}>
          创建
        </Button>
      </Modal>
    </PageContainer>
  );
};
export default FilesPage;
