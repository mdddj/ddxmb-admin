import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Button, Card, Col, message, Row } from 'antd';
import { useMount } from '@umijs/hooks';
import { CreateFolder, GetFilesWithFolderId, GetFolders } from '@/services/file_service';
import { simpleHandleResultMessage } from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';
import { FileInfo } from '@/entrys/FileInfo';
import { Spacer } from '@geist-ui/react';
import { CopyFilled, FileFilled, FolderFilled } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { useRequest } from '@@/plugin-request/request';

// 文件列表
const FilesPage: React.FC = () => {
  const [folders, setFolders] = useState<ResCategory[]>([]);
  const [currFolder, setCueeFolder] = useState<ResCategory>();
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [createFolderName, setCreateFolderName] = useState<string>('');

  // 组件挂载完成
  useMount(async () => {
    const result = await GetFolders();
    await simpleHandleResultMessage<ResCategory[]>(
      result,
      (data) => {
        setFolders(data);
      },
      false,
    );
  });

  // 选中某个文件夹
  const onSelect = async (item: ResCategory) => {
    setCueeFolder(item);
    const result = await GetFilesWithFolderId(item.id, { page: 0, pageSize: 10 });
    await simpleHandleResultMessage(
      result,
      (data) => {
        setFiles(data.list);
      },
      false,
    );
  };

  const createService = (name: string) => {
    return CreateFolder(name, currFolder);
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
        <span>/root</span>
      </Card>

      <Spacer />

      <Row gutter={12}>
        {!currFolder &&
          folders.map((item) => (
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
              <div>
                {item.fileName}
                <CopyToClipboard text={item.url} onCopy={() => message.success('复制url成功')}>
                  <CopyFilled />
                </CopyToClipboard>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/*  创建文件夹弹窗 */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={'md'}>
        <DialogTitle>创建文件夹</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="文件夹名称"
            value={createFolderName}
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setCreateFolderName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={createFolder} type={'primary'} loading={loading}>
            创建
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};
export default FilesPage;
