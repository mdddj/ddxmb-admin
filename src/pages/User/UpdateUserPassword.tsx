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

  const { initialState } = useModel('@@initialState');

  const currentUser = initialState && initialState.currentUser;
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
    values.id = currentUser?.id;
    const result = await Api.getInstance().updateUserProfile(values as User);
    successResultHandle<User | undefined>(
      result,
      (_) => {
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
            <UpdatePasswordForm />
          </TabPane>
          <TabPane tab="高级设置" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

///修改密码的输入框
const UpdatePasswordForm: React.FC = () => {
  const [form] = Form.useForm();
  ///提交修改
  const submitPass = (values: any) => {
    console.log(values);
    Api.getInstance()
      .updateUserPasswordWithAdmin(values.oldPassword, values.newPassword)
      .then((value) => {
        successResultHandle(value, message.success, message.error);
      });
  };
  return (
    <>
      <Form onFinish={submitPass} layout={'vertical'} form={form}>
        <Form.Item required={true} label={'旧密码'} name={'oldPassword'}>
          <Input type={'password'} />
        </Form.Item>
        <Form.Item
          label={'新密码'}
          name={'newPassword'}
          rules={[
            {
              required: true,
              message: '请输入新密码',
            },
            {
              min: 6,
              message: '密码不能少于6位字符',
            },
            {
              max: 20,
              message: '密码不能超过20字符',
            },
            {
              validator: (_, value, callback) => {
                let oldPass = form.getFieldValue('oldPassword');
                if (oldPass === value) {
                  callback('新密码不能和旧密码一致,请重新输入');
                } else {
                  callback(undefined);
                }
              },
            },
          ]}
        >
          <Input type={'password'} />
        </Form.Item>
        <Form.Item
          label={'确认新密码'}
          name={'newPassword2'}
          rules={[
            {
              required: true,
              message: '请输入确认新密码',
            },
            {
              validator: (_, value, callback) => {
                let newPass = form.getFieldValue('newPassword');
                if (value != newPass) {
                  callback('两次密码不一致,请重新输入');
                } else {
                  callback(undefined);
                }
              },
            },
            {
              min: 6,
              message: '密码不能少于6位字符',
            },
          ]}
        >
          <Input type={'password'} />
        </Form.Item>
        <Form.Item>
          <Button htmlType={'submit'}>确认修改</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateUserPassword;
