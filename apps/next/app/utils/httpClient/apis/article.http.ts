const URL = "article";
import http from "@utils/httpClient/fetch";
type ArticleList = Array<{
  id: number;
  title: string;
  author: string;
  cover: string;
}>;
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

// 请求文章列表
export const getArticleList = async () => {
  console.log(http, "http");
  const response = await http.get<ApiResponse<ArticleList[]>>(URL, {
    headers: { 'cache-control': 'no-cache' }
  });
  return response.data.data;
};

// 请求文章详情
export const getArticleDetail = (id: number) => {
  return {
    url: `${URL}/${id}`,
    method: "get",
  };
};

// 发布文章
export const publishArticle = (data: any) => {
  return {
    url: URL,
    method: "post",
    data,
  };
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
