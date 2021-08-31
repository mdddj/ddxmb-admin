import { message } from 'antd';

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

export const ParseResultToProTable = (result: Result<any>) => {
  return {
    data: result.data.list,
    success: responseIsSuccess(result),
    total: result.data.page.total,
    current: result.data.page.currentPage,
  };
};
