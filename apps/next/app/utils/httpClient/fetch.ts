import { message   } from "antd";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
// import { RegisterApi } from "@/utils/httpClient/apis/user";
type ErrorObject = {
  mes: string;
  type: "success" | "error" | "warning" | "info";
};

type RequestOptions = {
  method: string;
  params?: object;
  body?: string;
  headers?: Record<string, string>;
};

interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}
// console.log(msg,'==2=2==2-------------')
// // const BASE_URL = "http://123.207.197.182:3000/api/";

// // const url = "http://123.207.197.182:3000/api/";
// // const url2 = "http://localhost:3001/api/";
const BASE_URL = "http://localhost:80/api/";

const handleResponseError = (response: ApiResponse<any>): ErrorObject => {
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
      console.log("handle401Error----------------", error.mes);
      // RegisterApi();
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
// 定义一个响应拦截装饰器
// const responseInterceptor = (
//   target: any,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ): any => {
//   const originalMethod = descriptor.value;
//   descriptor.value = async function (
//     this: any,
//     url: string,
//     body: object
//   ) {
//     const response = await originalMethod.call(this, url, body);
//     console.log("response----------a", response);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const responseData= await response.json();
//     console.log(msg,'===================')
//     // const { mes, type } = handleResponseError(responseData);
//     // message.open({ content: mes, type });
//     return responseData
//   };
// };

// class NetworkService {
//   @responseInterceptor
//   post(url: string, body: object) {
//     return this.fetch(url, {
//       method: "POST",
//       body: JSON.stringify(body),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
//   async fetch(url: string, options: RequestOptions) {
//     return await fetch(`${BASE_URL}${url}`, {
//       credentials: "include",
//       ...options,
//       cache: "no-cache",
//     });
//   }
//   @responseInterceptor
//   async get(url: string, params?: object) {
//     return await this.fetch(url, { method: "get", params });
//   }

//   // put = (url: string, body: object) => {
//   //   return this.fetch(url, { method: "PUT", body });
//   // };

//   // delete = (url: string, body: object) => {
//   //   return this.fetch(url, { method: "delete", body });
//   // };

//   // patch = (url: string, body: object) => {
//   //   return this.fetch(url, { method: "patch", body });
//   // };
// }
// export default new NetworkService();

const instance = axios.create({
  baseURL: BASE_URL, // 基础URL，后面的请求会拼接到这个URL上
  timeout: 5000, // 请求超时时间
  // 可以在这里添加其他公共选项，如headers等
});
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 例如，添加token到请求头
    // if (localStorage.getItem('token')) {
    //   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    // }
    // withCredentials

    config.withCredentials = true;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    // 对响应数据做点什么
    // 例如，返回的数据可能包含code、message、data等字段，你可能需要只返回data字段
    // console.log(response.data)
    // if(response.data.code!== 200){
    //   message.error(response.data.message)
    // }
    //
    const { mes, type } = handleResponseError(response.data);
    console.log(typeof window ,'=================080',process.browser)
    console.log(JSON.stringify(message), "message");
    // message.open({ content: mes, type });
    return response;
  },
  (error: AxiosError) => {
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.log(error.request);
    } else {
      // 发送请求时发生了某些错误
      console.log("Error", error.message);
    }
    return Promise.reject(error);
  }
);
class NetworkService {

}
export default instance
// class instance {
//   private instance: AxiosInstance;

//   constructor(baseURL: string) {
//     this.instance = axios.create({
//       baseURL,
//       timeout: 5000,
//     });
//     console.log(message, "message");

//     // 添加请求拦截器
//     this.instance.interceptors.request.use(
//       (config) => {
//         // 可以在这里添加token到请求头
//         // if (localStorage.getItem('token')) {
//         //   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//         // }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     // 添加响应拦截器
//     this.instance.interceptors.response.use(
//       (response: AxiosResponse<ApiResponse<any>>) => {
//         const { mes, type } = handleResponseError(response.data);
//         // 如果需要根据响应状态码做不同处理，可以在这里添加
//         // 例如：if (response.data.code !== 200) { ... }
//         return response.data; // 只返回data字段
//       },
//       (error: AxiosError) => {
//         if (error.response) {
//           // 请求已发出，但服务器响应的状态码不在 2xx 范围内
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         } else if (error.request) {
//           // 请求已发出，但没有收到响应
//           console.log(error.request);
//         } else {
//           // 发送请求时发生了某些错误
//           console.log("Error", error.message);
//         }
//         return Promise.reject(error);
//       }
//     );
//   }

//   // 封装请求方法
//   get<T = any>(url: string, params?: AxiosRequestConfig['params']) {
//     return this.instance.get<ApiResponse<T>>(url, { params });
//   }

//   // post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
//   //   return this.instance.post<ApiResponse<T>>(url, data, config);
//   // }

//   // 可以继续封装其他HTTP方法
// }
// export default new instance(BASE_URL);
