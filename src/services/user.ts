import { request } from 'umi';
import { APILoginData } from '@/services/models/API.LOGIN';

// 获取全部用户列表
export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

// 获取当前登录用户
export async function queryCurrent() {
  return request<APILoginData>('/api/auth/current');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

// 获取二维码
export async function getQrCodeUuid(): Promise<any> {
  return request<String>('/api/gener-code');
}

// 获取数据
export async function checkUUidCode(uuid: string): Promise<any> {
  return request<String>('/api/user-get?uuid=' + uuid);
}
