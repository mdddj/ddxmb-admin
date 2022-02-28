import request from 'umi-request';
import { DtkDetail } from '@/pages/Application/model/list_result_model';
import { Result } from 'dd_server_api_web/apis/utils/ResultUtil';

// 获取应用列表
export async function getApplicationList() {
  return request<Result<DtkDetail[]>>('/api/app/list');
}
