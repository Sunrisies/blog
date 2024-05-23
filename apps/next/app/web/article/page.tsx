"use strict";
import HomeMain from "@/components/HomeMain/Home";
import styles from "./article.module.scss";
interface searchParamsInterface {
  id: string;
}
const getData = async () => {
  // const res = await fetch("http://123.207.197.182:80/api/article", {
  //   cache: "no-cache",
  // });

  const res = await fetch("http://localhost:80/api/article", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
const filterFetch = async () => {
  const { data, pageSize, message, Code, page } = await getData();
  if (Code !== 200) {
    return new Error("请求错误");
  }
  // console.log(data,'data')
  return data;
};
export default async () => {
  const data = await filterFetch();
  return (
    <>
      <div className={styles.container}>
        <div>文章列表</div>
        <HomeMain list={data}></HomeMain>
      </div>
    </>
  );
};
