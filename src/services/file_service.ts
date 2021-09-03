import request from 'umi-request';
import { Result } from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';

/**
 * 上传文件
 * @param data 数据
 */
export async function UploadFile(data: FormData) {
  return request('/api/auth/file-upload', {
    method: 'POST',
    data: data,
  });
}

/**
 * 获取文件夹列表
 * @param name  父文件夹
 * @constructor
 */
export async function GetFolders(name?: string): Promise<Result<ResCategory[]>> {
  return request<Result<ResCategory[]>>('/api/file/get-folders', {
    method: 'GET',
    params: {
      name,
    },
  });
}
