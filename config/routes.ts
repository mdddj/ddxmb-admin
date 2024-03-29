﻿export default [
  {
    path: '/account',
    routes: [
      {
        path: '/account/settings',
        component: './User/UpdateUserPassword',
      },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/users',
    name: '用户管理',
    icon: 'smile',
    routes: [
      {
        path: '/users/list',
        name: '用户列表',
        icon: 'list',
        component: './User/list/UserListView',
      },
      {
        path: '/users/add',
        name: '添加新用户',
        icon: 'list',
        component: './User/list/AddNewUser',
      },
    ],
  },
  {
    path: '/blog',
    name: '文章管理',
    icon: 'FolderOutlined',
    routes: [
      {
        path: '/blog/list',
        name: '博客列表',
        icon: 'list',
        component: './Blog/BlogIndex',
      },
      {
        path: '/blog/write',
        name: '发布博客',
        icon: 'push',
        component: './Blog/subpage/write/BlogWrite',
      },
      {
        path: '/blog/preview',
        name: '博客预览',
        icon: 'preview',
        component: './Blog/subpage/BlogPreview',
      },
    ],
  },
  {
    path: '/resources',
    name: '资源管理',
    icon: 'plus',
    routes: [
      {
        path: '/resources/write',
        name: '发布资源',
        component: './Resource/write',
      },
    ],
  },
  {
    path: '/file',
    name: '文件系统',
    icon: 'plus',
    routes: [
      {
        path: '/file/list',
        name: '文件列表',
        component: './File/Files',
      },
      {
        path: '/file/upload',
        name: '上传文件',
        component: './File/Upload',
      },
    ],
  },
  {
    path: '/category',
    name: '分类管理',
    icon: 'NotificationOutlined',
    routes: [
      {
        path: '/category/blog/list',
        name: '博客分类',
        component: './Category/BlogCategory/index',
      },
      {
        path: '/category/res/list',
        name: '群组分类',
        component: './Category/ResourcesCategory/index',
      },
    ],
  },
  {
    path: '/text',
    name: '字典',
    icon: 'KeyOutlined',
    routes: [
      {
        path: '/text/list',
        name: '字典列表',
        icon: 'preview',
        component: './Text/List',
      },
    ],
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'OrderedListOutlined',
    routes: [
      {
        path: '/order/select',
        name: '订单查询',
        icon: 'applications',
        component: './Order/select',
      },
    ],
  },
  {
    path: '/app',
    name: '应用管理',
    icon: 'AppstoreOutlined',
    routes: [
      {
        path: '/app/aplay',
        name: '我的应用',
        icon: 'applications',
        component: './Application/Index',
      },
      {
        path: '/app/version',
        name: '版本管理',
        icon: 'plus',
        component: './File/version',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
  {
    component: './User/UpdateUserPassword',
  },
  {
    path: '/account',
    routes: [
      {
        // path: '/account/settings',
        component: './User/UpdateUserPassword',
      },
    ],
  },
];
