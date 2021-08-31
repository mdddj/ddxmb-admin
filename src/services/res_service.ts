import { PageParam } from '@/entrys/PageModel';
import { request } from 'umi';
import { PagerModel, Result } from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';
import { merge } from 'lodash';

/**
 * 获取资源列表
 * @param pageModel 分页数据
 * @param resCategory 查询条件
 * @constructor
 */
export async function GetResourceCategoryList(
  pageModel: PageParam,
  resCategory?: ResCategory,
): Promise<
  Result<{
    page: PagerModel;
    list: ResCategory[];
  }>
> {
  return request<
    Result<{
      page: PagerModel;
      list: ResCategory[];
    }>
  >('/api/res/list', {
    method: 'GET',
    params: merge(pageModel, resCategory),
  });
}
