import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { message as msg } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import Title from 'antd/lib/typography/Title';
import Api from '@/utils/request';
import { successResultHandle } from 'dd_server_api_web/apis/utils/ResultUtil';

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  }, 10);
};

type LoginFormType = {
  loginNumber: string;
  password: string;
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  // 加载用户信息
  const fetchUserInfo = async (token: string) => {
    console.log('正在请求用户信息' + token);
    localStorage.setItem('token', token);
    const userInfo = await initialState?.fetchUserInfo?.(token);

    if (userInfo) {
      setInitialState({ ...initialState, currentUser: userInfo });
    }
  };

  const handleSubmit = async (values: LoginFormType) => {
    setSubmitting(true);

    try {
      // 登录
      const res = await Api.getInstance().login(values.loginNumber, values.password);
      successResultHandle<string>(
        res,
        async (data) => {
          msg.success('登录成功！');
          await fetchUserInfo(data);
          goto();
          return;
        },
        (message) => {
          msg.error(message);
        },
      );
    } catch (error) {
      msg.error('登录失败，请重试！');
    }

    setSubmitting(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={'/logo.svg'} />
                <span className={styles.title}>握草</span>
              </Link>
            </div>
            {/*<div className={styles.desc}>典典的小卖部,最强的开源跨平台淘宝客APP应用</div>*/}
          </div>

          <div className={styles.main}>
            <ProForm
              initialValues={{
                autoLogin: true,
              }}
              submitter={{
                searchConfig: {
                  submitText: '登录',
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  loading: submitting,
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
              onFinish={async (values) => {
                await handleSubmit(values as LoginFormType);
              }}
            >
              <Title level={1}>登录</Title>

              <>
                <ProFormText
                  name="loginNumber"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="用户名"
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockTwoTone className={styles.prefixIcon} />,
                  }}
                  placeholder="密码"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码!',
                    },
                  ]}
                />
              </>
            </ProForm>
          </div>
          {/*<ScanCodeComponent*/}
          {/*  onSuccess={(token) => {*/}
          {/*    Modal.success({*/}
          {/*      content: '登录成功: 用户token:' + token,*/}
          {/*    });*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
