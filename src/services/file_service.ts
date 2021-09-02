import request from 'umi-request';

/**
 * 上传文件
 * @param data 数据
 */
export async function UploadFile(data: any) {
  return request('/api/file/upload', {
    method: 'POST',
    data: data,
  });
}
