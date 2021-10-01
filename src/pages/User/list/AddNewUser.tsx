import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { Card, Form, Input } from 'antd';
import AvatorPictorSelect from '@/pages/User/components/ava_select_component';

const AddNewUser: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Form>
          <AvatorPictorSelect />
          <Form.Item label={'用户名'} name={'loginName'}>
            <Input />
          </Form.Item>

          <Form.Item label={'输入登录密码'} name={'password'}>
            <Input />
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default AddNewUser;
