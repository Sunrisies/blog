"use strict";
import HomeMain from "@/components/HomeMain/Home";
import styles from "./article.module.scss";
import { getArticleList } from "@/utils/httpClient/apis/article.http";
import axios from "axios";
interface searchParamsInterface {
  id: string;
}
// {
//   "id": 1,
//   "title": "农土列来价第地叫报马算院查响全",
//   "author": "龙秀英",
//   "cover": "http://dummyimage.com/88x31"
// }
type ArticleList = Array<{
  id: number;
  title: string;
  author: string;
  cover: string;
}>;
export default async () => {
  console.log(1111,'==================')
  const data = await getArticleList();
  // axios.get("http://localhost:80/api/article").then((res) => {
  //   console.log(res);
  // });
  return (
    <>
      <div className={styles.container}>
        <div>文章列表</div>
        {/* data是接口返回的文章列表数据，如果为空，则显示暂无数据 */}
        {data.length === 0 && <div>暂无数据</div>}
        {data.length > 0 && <HomeMain list={data}></HomeMain>}
      </div>
    </>
  );
};
