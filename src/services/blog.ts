import PushNewBlogParams from '@/services/models/PushNewBlogParamsModel';
import request from 'umi-request';
import { BlogPushNewResultData, Category } from '@/services/models/BlogPushNewResultData';
import { PageParam } from '@/entrys/PageModel';
import { merge } from 'lodash';
import { Result } from '@/utils/result';

// 发布一篇新博客
export async function pushNewBlog(params: PushNewBlogParams) {
  return request<BlogPushNewResultData>('/api/blog/push-new', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除一篇博客
 * @param blogId 博客id
 */
export async function deleteBlog(blogId: number) {
  return request('/api/blog/delete', {
    method: 'DELETE',
    data: {
      id: blogId,
    },
  });
}

/**
 * 获取分类列表
 */
export async function getBlogCategorys() {
  return request('/api/blog/category-list', {
    method: 'GET',
  });
}

/**
 * 获取全部的标签列表
 */
export async function getBlogTags() {
  return request('/api/blog/tags', { method: 'GET' });
}

/**
 * 使用博客id获取博客信息
 * @param id  博客id
 */
export async function getBlogDetailById(id: number) {
  return request('/api/blog/get/' + id, { method: 'GET' });
}

/**
 * 或者博客分类列表
 * @param pageModel 分页
 * @param category? 查询条件
 * @constructor
 */
export async function GetCategoryForTableData(pageModel: PageParam, category?: Category) {
  return request('/api/blog/category/list', {
    method: 'GET',
    params: merge(pageModel, category),
  });
}

/**
 * 添加或者修改一个博客分类
 * @param category 修改或者添加的模型
 * @constructor
 */
export async function SaveAndUpdateBlogCategory(category: Category): Promise<Result<Category>> {
  return request<Result<Category>>('/api/auth/blog-category-save', {
    method: 'POST',
    data: category,
  });
}

/**
 * 删除一个分类,如果分类下存在博客,需要将该分类下的全部博客删除,才能删除此分类
 * @param id  分类id
 * @constructor
 */
export async function DeleteBlogCategory(id: number) {
  return request('/api/auth/blog-category-delete', {
    data: { id },
    method: 'DELETE',
  });
}
