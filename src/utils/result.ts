import { message } from 'antd';
import { AntdTableResultData } from '@/entrys/PageModel';

export interface Result<T> {
  state: number;
  message: string;
  data: T;
}

export interface PagerModel {
  total: number;
  currentPage: number;
  pageSize: number;
  maxPage: number;
  hasPrevious: boolean;
  paged: boolean;
}

/**
 * 判断请求是否成功
 * @param result  服务器返回的数据
 */
export function responseIsSuccess<T>(result: Result<T>) {
  return result.state === 200;
}

/**
 * 简单处理服务器的消息
 * @param result  服务器返回的数据
 * @param success 操作成功返回的数据
 */
export async function simpleHandleResultMessage<T>(result: Result<T>, success?: (data: T) => void) {
  if (responseIsSuccess<T>(result)) {
    message.success(result.message);
    success && success(result.data);
  } else {
    message.error(result.message);
  }
}

/**
 * 使用实例
    const fetchDataList = async (params: any, _: any, __: any) => {
    const param = coverAntdPageParamModelToRequestParam(params);
    const result = await GetResourceCategoryList(param);
    return ParseResultToProTable<ResCategory>(result)  // <<<<<---------------这里
  }
 * @param result
 * @constructor
 */
export const ParseResultToProTable = <T>(result: Result<any>): AntdTableResultData<T> => {
  return {
    data: result.data.list as T[],
    success: responseIsSuccess(result),
    total: result.data.page.total,
    current: result.data.page.currentPage,
  } as AntdTableResultData<T>;
};
