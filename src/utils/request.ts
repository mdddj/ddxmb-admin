import DdServerApiByWeb from 'dd_server_api_web/apis';
import TaokeApi from 'dd_server_api_web/apis/taoke';

/**
 * 接口方法
 */
class Api {
  static isLocal: boolean = true;
  static host: string = Api.isLocal ? 'http://localhost' : 'https://itbug.shop';

  static getInstance(): DdServerApiByWeb {
    let token = localStorage.getItem('token') ?? undefined;
    let api = DdServerApiByWeb.getInstance();
    api.host = this.host;
    api.token = token;
    return api;
  }

  static taokeApi(): TaokeApi {
    let api = TaokeApi.getInstance();
    api.host = this.host;
    return api;
  }
}

export default Api;
