import request from 'umi-request';
import { Page, Result } from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';
import { merge } from 'lodash';
import { PageParam } from '@/entrys/PageModel';
import { FileInfo } from '@/entrys/FileInfo';

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

/**
 * 根据文件夹id或者文件列表
 * @param folderId  文件夹id
 * @param pageModel 分页数据
 * @constructor
 */
export async function GetFilesWithFolderId(
  folderId: number,
  pageModel: PageParam,
): Promise<Result<Page<FileInfo>>> {
  return request<Result<Page<FileInfo>>>('/api/file/get-files', {
    method: 'GET',
    params: merge({ id: folderId }, pageModel),
  });
}
