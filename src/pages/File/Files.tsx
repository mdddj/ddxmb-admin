import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Card, Col, message, Row } from 'antd';
import { useMount } from '@umijs/hooks';
import { GetFilesWithFolderId, GetFolders } from '@/services/file_service';
import { simpleHandleResultMessage } from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';
import { FileInfo } from '@/entrys/FileInfo';
import { Spacer } from '@geist-ui/react';
import { CopyFilled, FileFilled, FolderFilled } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// 文件列表
const FilesPage: React.FC = () => {
  const [folders, setFolders] = useState<ResCategory[]>([]);
  const [currFolder, setCueeFolder] = useState<ResCategory>();
  const [files, setFiles] = useState<FileInfo[]>([]);

  //
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

  console.log(currFolder);

  return (
    <PageContainer>
      {/* 操作区域 */}
      <Card>
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
    </PageContainer>
  );
};
export default FilesPage;
