import { message } from "antd";
type ErrorObject = {
  mes: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

type RequestOptions = {
  method: string;
  params?: object;
  body?: string;
  headers?: Record<string, string>;
};
// 定义一个响应拦截装饰器
const responseInterceptor = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  console.log("responseInterceptor", target, propertyKey, descriptor);
  descriptor.value = async function (this: any, url: string, body: object) {
    console.log("Before sending request");

    const response = await originalMethod.call(this, url, body);

    const responseData = await response.json();
    console.log("Intercepted Response Data:", responseData);
   const {  mes ,type} =  handleResponseError(responseData);
   console.log(message,'message',type)
  message.open({ content: mes, type })

    return responseData;
  };
};
type Response = {
  code: number;
  data: any;
  message: string;
};
const handleResponseError = (response: Response): ErrorObject => {
  console.log("handleResponseError", response);
  const error: ErrorObject = {
    mes: "",
    type: "success",
  };
  switch (response.code) {
    case 200:
      error.mes = response.message; // 假设有data字段
      error.type = "success";
      break;
    case 400:
      error.mes = response.message; // 假设有data字段
      error.type = "error";
      break;
    case 401:
      error.mes = response.message || "登录信息已过期，请登录";
      error.type = "error";
      // logout();  // 假设有logout函数
      // handle401Error();
      break;
    case 403:
      error.mes = response.message || "拒绝访问";
      error.type = "error";
      break;
    case 408:
      error.mes = "请求超时";
      error.type = "error";
      break;
    // 其他状态码的处理略...
    default:
      break;
  }
  return error;
};

// const handle401Error = (): void => {
//   // logout();  // 假设有logout函数
//   const error: ErrorObject = {
//     message: "登录信息已过期，请登录",
//   };
// };

// onResponse = ({
//   request,
//   response,
//   options,
// }: {
//   request: any;
//   response: Response;
//   options: any;
// }): void => {
//   const error: ErrorObject = this.handleResponseError(response);
// };
class NetworkService {
  @responseInterceptor
  post(url, body) {
    console.log("del", url, body);
    return this.fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  fetch = (url: string, options: RequestOptions) => {
    const BASE_URL = "http://123.207.197.182:3000/api/";
    return fetch(`${BASE_URL}${url}`, { credentials: "include", ...options });
  };

  get = (url: string, params: object) => {
    return this.fetch(url, { method: "get", params });
  };

  put = (url: string, body: object) => {
    return this.fetch(url, { method: "PUT", body });
  };
  // post = async (url: string, body: object) => {

  // };

  delete = (url: string, body: object) => {
    return this.fetch(url, { method: "delete", body });
  };

  patch = (url: string, body: object) => {
    return this.fetch(url, { method: "patch", body });
  };
}

export default new NetworkService();
