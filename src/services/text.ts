import { request } from 'umi';
import { PagerModel, Result } from '@/utils/result';
import { TextModel } from '@/pages/Text/model';

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
