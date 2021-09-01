import { PageParam } from '@/entrys/PageModel';
import { request } from 'umi';
import { PagerModel, Result } from '@/utils/result';
import { ResCategory } from '@/entrys/ResCategory';
import { merge } from 'lodash';
import { ResourceModel } from '@/entrys/ResourceModel';

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

/**
 * 添加或者修改一个资源分类分页
 * @param category  分类
 * @constructor
 */
export async function SaveOrUpdateResourceCategory(category: ResCategory) {
  return request('/api/res/save', {
    method: 'POST',
    data: category,
  });
}

/**
 * 根据id删除某个群组
 * @param category  群组数据, 后台只会取id删除
 * @constructor
 */
export async function DeleteResourceCategoryById(category: ResCategory) {
  return request('/api/res/delete', {
    method: 'DELETE',
    data: category,
  });
}

/**
 * 根据名字模糊查询某个群组
 * @param name  群组名
 * @constructor
 */
export async function FindResCategoryListByNameLike(name: string) {
  return request('/api/res/like-list', {
    params: {
      name,
    },
  });
}

/**
 * 添加一个资源
 * @param model ResourceModel 对象模型
 * @constructor
 */
export async function SaveOrUpdateResourcesModel(model: ResourceModel) {
  return request('/api/resource/save', {
    method: 'POST',
    data: model,
  });
}
