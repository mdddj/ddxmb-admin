export default {
  /// 开发环境
  dev: {
    '/api/': {
      target: 'http://localhost:80/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },

  /// 测试环境
  test: {
    '/api/': {
      target: 'http://192.168.199.64/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },

  /// 生产环境
  pro: {
    '/api/': {
      target: 'https://itbug.shop/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
