type ErrorObject = {
  message: string;
};

type RequestOptions = {
  method: string;
  params?: object;
  body?: object;
};

class NetworkService {
  handleResponseError = (response: Response): ErrorObject => {
    const error: ErrorObject = {
      message: "",
    };
    switch (response.status) {
      case 400:
        error.message = response.data.message; // 假设有data字段
        break;
      case 401:
        this.handle401Error();
        break;
      case 403:
        error.message = response.data.message || "拒绝访问";
        break;
      case 408:
        error.message = "请求超时";
        break;
      // 其他状态码的处理略...
      default:
        break;
    }
    return error;
  };

  handle401Error = (): void => {
    // logout();  // 假设有logout函数
    const error: ErrorObject = {
      message: "登录信息已过期，请登录",
    };
  };

  onResponse = ({
    request,
    response,
    options,
  }: {
    request: any;
    response: Response;
    options: any;
  }): void => {
    const error: ErrorObject = this.handleResponseError(response);
  };
  fetch = (url: string, options: RequestOptions) => {
    // 初始化fetch，使用create配置公共地址文件和头部信息

    const $fetch = $fetch.create(createData);
    return $fetch(url, options);
  };

  get = (url: string, params: object) => {
    return this.fetch(url, { method: "get", params });
  };

  put = (url: string, body: object) => {
    return this.fetch(url, { method: "PUT", body });
  };

  post = (url: string, body: object) => {
    return this.fetch(url, { method: "POST", body });
  };

  delete = (url: string, body: object) => {
    return this.fetch(url, { method: "delete", body });
  };

  patch = (url: string, body: object) => {
    return this.fetch(url, { method: "patch", body });
  };
}

export default new NetworkService();
