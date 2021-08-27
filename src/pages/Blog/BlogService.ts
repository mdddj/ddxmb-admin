import request from 'umi-request';
import type { APICategoryListData } from '@/pages/Blog/components/write/models/API.CATEGORY_LIST.DATA';
import type { CategorySubmitParams } from '@/pages/Blog/components/write/category_add_button';
import { FindBlogParams } from '@/pages/Blog/components/list/ParamsTypes';
import { BlogAllData } from '@/pages/Blog/components/list/DATA.ts';

// 获取全部分类列表
export async function getCategoryList() {
  return request<APICategoryListData>('/api/blog/category-list', {
    method: 'GET',
  });
}

// 添加新分类
export async function addNewCategory(datas: CategorySubmitParams) {
  return request('/api/blog/category-add', {
    method: 'POST',
    data: datas,
    requestType: 'form',
  });
}

// 获取博客列表
export async function getBlogList(params: FindBlogParams): Promise<BlogAllData> {
  const genderUrl = `/api/blog/list?page=${params.page}&pageSize=${params.pageSize ?? 10}`;
  return request<BlogAllData>(genderUrl);
}

// 修改博客的头图
export async function updateThumbnail(id: number, url: string) {
  return request('/api/blog/update/thumbnail', {
    method: 'POST',
    data: {
      id: id,
      url: url,
    },
    requestType: 'form',
  });
}
