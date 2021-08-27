import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, CardContent, Fade, Typography } from '@material-ui/core';
import { Alert, Input, message, Upload } from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Spacer } from '@geist-ui/react';
import { RcFile } from 'antd/lib/upload/interface';
import Button from '@material-ui/core/Button';
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
          <CardContent>
            <Typography component={'h1'}>选择APK文件</Typography>

            <Spacer />
            <Upload beforeUpload={beforeUpload}>
              <Button startIcon={<UploadOutlined />}>选择APK文件</Button>
            </Upload>

            {apkFile ? (
              <div className={styles.fileSizeContaner}>
                <span>文件大小:{fileSizeCover(apkFile.size)}</span>
              </div>
            ) : (
              <span />
            )}
          </CardContent>
        </Card>

        <Spacer />

        {/*版本号输入框*/}
        <Card>
          <CardContent>
            <Typography component={'h1'}>请输入版本号</Typography>
            <Spacer />
            <Input
              placeholder="例子: 1.0.0"
              onChange={(event) => {
                setVersion(event.target.value);
              }}
            />
          </CardContent>
        </Card>

        {/*  提交 */}
        <Spacer />
        <Button
          color="primary"
          size="large"
          variant="contained"
          startIcon={<SaveOutlined />}
          disabled={!apkFile || !version || version == ''}
          onClick={submit}
        >
          提交
        </Button>

        <Spacer />
        <Fade in={downUrl != ''}>
          <Alert type={'success'} message={'上传成功:' + downUrl} />
        </Fade>
      </PageContainer>
    </>
  );
};

export default ApkVersionManage;
