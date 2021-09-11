import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message, notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import { User } from 'dd_server_api_web/apis/model/UserModel';
import Api from '@/utils/request';

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 */
export const initialStateConfig = {
  loading: <PageLoading tip={'快速加载中'} />,
};

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: User;
  userToken?: String;
  fetchUserInfo?: (token: string) => Promise<User | undefined>;
}> {
  const fetchUserInfo = async (token: string): Promise<User | undefined> => {
    try {
      const currentUser = await Api.getInstance().getUserInfo(token);
      if (typeof currentUser === 'object' && currentUser) {
        if (currentUser.state === 200) {
          return currentUser.data;
        } else {
          message.error(currentUser.message);
        }
      }
      history.push('/user/login');
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  // 只要不是登录页面,都要从服务器查询一下当前登录的用户信息,如果查询到,则把用户信息设置到全局状态管理中
  if (history.location.pathname !== '/user/login') {
    let token = localStorage.getItem('token') ?? '';
    const currentUser = await fetchUserInfo(token);
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = async (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;

    message.error(status + errorText);
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = {
    authorization: localStorage.getItem('token') ?? '',
  };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
};
