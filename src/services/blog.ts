import PushNewBlogParams from '@/services/models/PushNewBlogParamsModel';
import request from 'umi-request';
import { BlogPushNewResultData } from '@/services/models/BlogPushNewResultData';

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
  return request('/api/blog/get/'+id,{method: 'GET'});
}
