import { PageContainer } from '@ant-design/pro-layout';
import { Card, Input, Tabs, Form, Row, Col, Typography, Button, message } from 'antd';
import React, { useState } from 'react';
import AvatorPictorSelect from '@/pages/User/components/ava_select_component';
import { SystemPicter } from 'dd_server_api_web/apis/model/avater';
import { useMount } from '@umijs/hooks';
import { useModel } from '@@/plugin-model/useModel';
import Api from '@/utils/request';
import { User } from 'dd_server_api_web/apis/model/UserModel';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';

const { TabPane } = Tabs;
/**
 * 修改用户密码界面
 * @constructor
 */
const UpdateUserPassword: React.FC = () => {
  const [form] = Form.useForm();

  const {
    initialState: { currentUser },
  } = useModel('@@initialState');

  /// 加载用户信息
  useMount(() => {
    form.setFieldsValue(currentUser);
  });

  const [ava, setAva] = useState<SystemPicter>();

  /// 修改用户信息
  const updateUserProfile = async (values: any) => {
    if (ava) {
      values.picture = ava.url;
    }
    values.id = currentUser.id;
    const result = await Api.getInstance().updateUserProfile(values as User);
    successResultHandle<User | undefined>(
      result,
      (data) => {
        message.success('修改资料成功');
      },
      (msg) => {
        message.error(msg);
      },
    );
  };

  return (
    <PageContainer title={'个人设置'}>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="修改个人资料" key="1">
            <Row gutter={55}>
              <Col span={12}>
                <Form layout={'vertical'} onFinish={updateUserProfile} form={form}>
                  <Form.Item label={'用户名'} name={'loginNumber'}>
                    <Input disabled={true} readOnly={true} />
                  </Form.Item>
                  <Form.Item label={'昵称'} name={'nickName'}>
                    <Input />
                  </Form.Item>
                  <Form.Item label={'手机'} name={'phone'}>
                    <Input />
                  </Form.Item>
                  <Form.Item label={'邮箱'} name={'email'}>
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button type={'primary'} htmlType={'submit'}>
                      修改个人信息
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Typography>选择系统头像</Typography>
                <AvatorPictorSelect current={ava} onSelect={setAva} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="修改密码" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="高级设置" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default UpdateUserPassword;
