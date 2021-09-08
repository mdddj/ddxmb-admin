import TaokeApi from 'dd_server_api/apis/taoke';
import DdTaokeSdk from 'dd_server_api/apis';

const host = 'https://itbug.shop';
/**
 * 淘客api接口
 */
export const taokeApi = (): TaokeApi => {
  const api = TaokeApi.getInstance();
  api.host = host;
  return api;
};

/**
 * 博客api接口
 */
export const blogApi = (): DdTaokeSdk => {
  const api = DdTaokeSdk.getInstance();
  api.host = host;
  return api;
};
