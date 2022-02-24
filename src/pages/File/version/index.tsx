import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Button, Card, Input, message, Typography, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import { fileSizeCover } from '@/utils/utils';
import styles from './index.less';
import request from 'umi-request';

const ApkVersionManage: React.FC = () => {
  const [apkFile, setApkFile] = useState<RcFile>();
  const [version, setVersion] = useState<String>();
  const [downUrl, setDownUrl] = useState<String>('');

  const beforeUpload = (file: RcFile) => {
    setApkFile(file);
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append('files', apkFile!!);
    formData.set('version', version as any);
    message.loading('正在上传中');
    request
      .post('/api/version/uploadNew', {
        data: formData,
      })
      .then(function (response) {
        console.log(response);
        if (response.state == 200) {
          message.success('上传成功');
          setDownUrl(response.data);
        } else {
          message.error(response.message);
        }
      });
  };

  return (
    <>
      <PageContainer title={'上传新版本'}>
        {/*  选择文件按钮 */}
        <Card>
          <Typography>选择APK文件</Typography>

          <Upload beforeUpload={beforeUpload}>
            <Button>选择APK文件</Button>
          </Upload>

          {apkFile ? (
            <div className={styles.fileSizeContaner}>
              <span>文件大小:{fileSizeCover(apkFile.size)}</span>
            </div>
          ) : (
            <span />
          )}
        </Card>

        {/*版本号输入框*/}
        <Card>
          <Typography>请输入版本号</Typography>
          <Input
            placeholder="例子: 1.0.0"
            onChange={(event) => {
              setVersion(event.target.value);
            }}
          />
        </Card>

        {/*  提交 */}
        <Button
          color="primary"
          size="large"
          disabled={!apkFile || !version || version == ''}
          onClick={submit}
        >
          提交
        </Button>

        <Alert type={'success'} message={'上传成功:' + downUrl} />
      </PageContainer>
    </>
  );
};

export default ApkVersionManage;
