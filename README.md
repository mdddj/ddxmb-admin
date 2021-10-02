### 典典的小卖部后台

####1.关于

- 模板使用了阿里的 AntdPro5.0
- 代码使用 Typescript 编写
- api 使用典典小卖部 webApi [npm 包链接](https://www.npmjs.com/package/dd_server_api_web)
- 文件管理使用了阿里云 OSS
- Token 鉴权使用 java shiro jwt

####2.运行前配置在`src/utils/request.ts`文件中将https://itbug.shop这行注释掉

```typescript
class Api {
  // static host: string = 'https://itbug.shop'; /// 将这行注释,生产环境下的服务器地址
  static host: string = 'http://localhost'; // 开发环境

  static getInstance(): DdServerApiByWeb {
    let token = localStorage.getItem('token') ?? undefined;
    let api = DdServerApiByWeb.getInstance();
    api.host = this.host;
    api.token = token;
    return api;
  }
}
```

####3.运行需要安装 npm 或者 yarn

```bash
yarn
yarn start dev
```

构建静态文件部署到服务器

```bash
yarn build
```

####4.预览

![](https://static.saintic.com/picbed/huang/2021/10/02/1633166945394.png) ![](https://static.saintic.com/picbed/huang/2021/10/02/1633166945240.png) ![](https://static.saintic.com/picbed/huang/2021/10/02/1633166945412.png) ![](https://static.saintic.com/picbed/huang/2021/10/02/1633166945283.png) ![](https://static.saintic.com/picbed/huang/2021/10/02/1633166945329.png) ![](https://static.saintic.com/picbed/huang/2021/10/02/1633166945406.png) ![](https://static.saintic.com/picbed/huang/2021/10/02/1633166945381.png) ![](https://static.saintic.com/picbed/huang/2021/10/02/1633166945422.png) ![](https://static.saintic.com/picbed/huang/2021/10/02/1633166945403.png) ![](https://static.saintic.com/picbed/huang/2021/10/02/1633166945398.png) ![](https://static.saintic.com/picbed/huang/2021/10/02/1633166952897.png)
