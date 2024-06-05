import http from "@utils/httpClient/fetch";

// const userApi = {
//   // 获取访客列表
//   all_user_visitor_List: "/getVisitorList",
//   // 获取友情链接
//   all_user_friendly_Links: "/getFriendlyLinks",
// };
// export default userApi;
// const Login = '/login'
export const LoginApi = async () => {
  // credentials: "include",
  return await http.post("login", {
    user_name: "朝阳",
    pass_word: "1234567",
    headers: { "cache-control": "no-cache" },
  });
};

export const RegisterApi = async () => {
  return await http.get("refresh");
};
