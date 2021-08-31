import { request } from 'umi';

export type LoginParamsType = {
  loginNumber: string;
  password: string;
};

/**
 * 用户登录接口
 * 登录成功会返回一个字符串,值是jwt token 可以用这个token来获取用户信息
 * @param params 参数
 */
export async function fakeAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

/**
 * 用户退出登录
 */
export async function outLogin() {
  return request('/api/user/logout', { method: 'POST' });
}
