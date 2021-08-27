export default [
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
    path: '/blog',
    name: '文章管理',
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
        name: '预览',
        icon: 'preview',
        component: './Blog/subpage/BlogPreview'
      }
    ],
  },
  {
    path: '/app',
    name: '应用管理',
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
];
