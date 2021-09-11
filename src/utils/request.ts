import DdServerApiByWeb from 'dd_server_api_web/apis';

/**
 * 接口方法
 */
class Api {
  // static host: string = 'https://itbug.shop';
  static host: string = 'http://localhost';

  static getInstance(): DdServerApiByWeb {
    let api = DdServerApiByWeb.getInstance();
    api.host = this.host;
    return api;
  }
}

export default Api;
