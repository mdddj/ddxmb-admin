import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Button, Card, Form, Input, message, Typography } from 'antd';
import AvatorPictorSelect from '@/pages/User/components/ava_select_component';
import { SystemPicter } from 'dd_server_api_web/apis/model/avater';
import Api from '@/utils/request';
import { responseIsSuccess } from 'dd_server_api_web/apis/utils/ResultUtil';

const AddNewUser: React.FC = () => {
  const [avatar, setAvatar] = useState<SystemPicter>();
  const [registarIng, setRegistarIng] = useState<boolean>(false);

  const submit = async (values: any) => {
    console.log(values);
    if (values.password != values.repassword) {
      message.error('两次输入密码不一致');
      return;
    }
    if (!avatar) {
      message.error('请选择头像');
      return;
    }

    setRegistarIng(true);
    const result = await Api.getInstance().register(
      values.loginName,
      values.password,
      avatar?.url ?? '',
    );
    if (responseIsSuccess(result)) {
      message.success(result.message);
    } else {
      message.error(result.message);
    }
    setRegistarIng(false);
  };

  return (
    <PageContainer>
      <Card>
        <Form layout={'vertical'} onFinish={submit}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            <Typography>设置用户头像</Typography>
            <AvatorPictorSelect current={avatar} onSelect={setAvatar} />
          </div>
          <Form.Item label={'用户名'} name={'loginName'}>
            <Input />
          </Form.Item>

          <Form.Item
            label={'输入登录密码'}
            name={'password'}
            rules={[
              {
                required: true,
                message: '请输入登录密码',
              },
            ]}
          >
            <Input type={'password'} />
          </Form.Item>

          <Form.Item
            label={'再确认一遍密码'}
            name={'repassword'}
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
            ]}
          >
            <Input type={'password'} />
          </Form.Item>

          <Form.Item>
            <Button loading={registarIng} type={'primary'} htmlType={'submit'}>
              创建新帐号
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default AddNewUser;
