import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import { useForm } from 'antd/es/form/Form';
import ResCategorySelect from '@/widgets/ResCategorySelect';
import { ResCategory } from '@/entrys/ResCategory';
import { UploadFile } from '@/services/file_service';
import { simpleHandleResultMessage } from '@/utils/result';

// 文件上传界面
const UploadPage: React.FC = () => {
  const [file, setFile] = useState<RcFile>();
  const [category, setCategory] = useState<ResCategory>();
  const [form] = useForm();

  // 选择文件
  const beforeUpload = (file: RcFile) => {
    setFile(file);
    form.setFieldsValue({ fileName: file.name });
  };

  console.log(file);

  // 提交到服务器
  const submit = async (values: any) => {
    const formData = new FormData();
    values.folder = category;
    formData.append('file', file!!);
    formData.set('info', JSON.stringify(values as any));
    const result = await UploadFile(formData);
    await simpleHandleResultMessage(result, (data) => {
      console.log(data);
    });
  };

  return (
    <PageContainer>
      <Card>
        <Form layout={'vertical'} form={form} onFinish={submit}>
          <Form.Item
            label={'自定义文件名'}
            name={'fileName'}
            tooltip={'如果不设置文件名将默认使用原始的文件名'}
          >
            <Input />
          </Form.Item>
          <Form.Item label={'标记颜色值'} name={'tagColor'}>
            <Input />
          </Form.Item>
          <Form.Item label={'备注'} name={'intro'}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Card>
              <Card.Grid style={{ width: '50%' }} hoverable={true}>
                <Form.Item
                  label={'选择文件'}
                  validateStatus={file ? 'success' : 'error'}
                  help={file ? '文件大小:' + file.size : '请上传文件'}
                >
                  <Upload
                    beforeUpload={beforeUpload}
                    multiple={false}
                    onRemove={(file1) => {
                      setFile(undefined);
                    }}
                    maxCount={1}
                  >
                    <Button>选择文件</Button>
                  </Upload>
                </Form.Item>
              </Card.Grid>

              <Card.Grid style={{ width: '50%' }} hoverable={true}>
                <Form.Item
                  label={'选择文件夹'}
                  validateStatus={category ? 'success' : 'error'}
                  help={category ? '已选择文件夹' : '请选择文件夹'}
                >
                  <ResCategorySelect current={category} onSelect={setCategory} />
                </Form.Item>
              </Card.Grid>
            </Card>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType={'submit'}
              type={'primary'}
              disabled={file == undefined || category == undefined}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default UploadPage;
