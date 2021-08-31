import { request } from 'umi';
import { PagerModel, Result } from '@/utils/result';
import { TextModel } from '@/pages/Text/model';

// 获取字典列表
export async function getTextList(
  page: number,
  pageSize: number,
  name?: string,
): Promise<
  Result<{
    list: TextModel[];
    page: PagerModel;
  }>
> {
  return request<
    Result<{
      list: TextModel[];
      page: PagerModel;
    }>
  >(`/api/text/list`, {
    method: 'GET',
    params: {
      page,
      pageSize,
      name,
    },
  });
}

/**
 * 添加或者修改对象
 * @param text  字典对象
 */
export async function saveText(text: TextModel): Promise<Result<TextModel>> {
  return request<Result<TextModel>>('/api/text/update', {
    method: 'POST',
    data: text,
  });
}
