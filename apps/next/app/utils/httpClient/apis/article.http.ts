const URL = "article";
import http from "@utils/httpClient/fetch";
import { ArticleList,Article } from "@/types/article.type";
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

// 请求文章列表
export const getArticleList = async () => {
  const response = await http.get<ApiResponse<ArticleList[]>>(URL, {
    headers: { "cache-control": "no-cache" },
  });
  return response.data.data;
};

// 请求文章详情
export const getArticleDetail = async (id: number) => {
  const response = await http.get<ApiResponse<Article>>(`${URL}/${id}`);
  return response.data.data;
};

// 发布文章
export const publishArticle = async(data: any) => {
  const response = await  http.post<ApiResponse<Article>>(URL, data);
  console.log(response);
  return response.data.data;
  
};

// 更新文章
export const updateArticle = (id: number, data: any) => {
  return {
    url: `${URL}/${id}`,
    method: "put",
    data,
  };
};

// 删除文章
export const deleteArticle = (id: number) => {
  return {
    url: `${URL}/${id}`,
    method: "delete",
  };
};
