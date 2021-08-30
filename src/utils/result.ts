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
export const responseIsSuccess: (result: Result<any>) => boolean = (result: Result<any>) => {
  return result.state === 200;
};

export const ParseResultToProTable = (result: Result<any>) => {
  return {
    data: result.data.list,
    success: responseIsSuccess(result),
    total: result.data.page.total,
    current: result.data.page.currentPage,
  };
};
