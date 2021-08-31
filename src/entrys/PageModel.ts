export interface PageParam {
  page: number;
  pageSize: number;
}

export interface AntdTablePageParams {
  current: number | undefined;
  pageSize: number | undefined;
}

export const coverAntdPageParamModelToRequestParam = <T>(
  params: AntdTablePageParams,
): PageParam => {
  return {
    page: (params.current ?? 1) - 1,
    pageSize: params.pageSize ?? 10,
  } as PageParam;
};

export interface AntdTableResultData<T> {
  data: T[];
  success: boolean;
  total: number;
  current: number;
}
