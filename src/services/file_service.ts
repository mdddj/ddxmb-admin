import request from 'umi-request';
import { Page, Result } from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';
import { merge } from 'lodash';
import { PageParam } from '@/entrys/PageModel';
import { FileInfo } from '@/entrys/FileInfo';
import { SaveOrUpdateResourceCategory } from '@/services/res_service';

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
 * @param id  父文件夹
 * @constructor
 */
export async function GetFolders(id?: number): Promise<Result<ResCategory[]>> {
  return request<Result<ResCategory[]>>('/api/file/get-folders', {
    method: 'GET',
    params: {
      id,
    },
  });
}

/**
 * 根据文件夹id或者文件列表查找文件列表
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

/**
 * 创建文件夹接口
 * @param name  文件夹名字
 * @param paramFolder 父文件夹
 * @constructor
 */
export async function CreateFolder(name: string, parenFolder?: ResCategory) {
  const cate = {
    name,
    type: 'folder',
  } as ResCategory;
  if (parenFolder) {
    cate.parentNode = parenFolder;
  }
  return SaveOrUpdateResourceCategory(cate);
}
