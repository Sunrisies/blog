import Menu from "@/components/menu";
import Me from "@/components/markdown";
import HomeMain from "@/components/HomeMain/Home";
import { readMarkdownFile } from "@/utils/markdown";
import MdEditorRt from "@/components/mdEditorRt/mdEditorRt";
import path from "node:path";
import styles from "./id.module.scss";
type Article = {
  id: number;
  title: string;
  author: string;
  cover: string;
  content: string;
  Code: number;
  message: number;
};
interface searchParamsInterface {
  id: string;
}
async function getData(id: number) {
  const res = await fetch(`http://123.207.197.182:80/api/article/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const filterFetch = async (id: number) => {
  const { Code, message, ...data } = await getData(id);
  if (Code !== 200) {
    new Error("请求错误");
    return;
  }
  return data;
};
export default async ({ params }: { params: searchParamsInterface }) => {
  const data: Article = await filterFetch(+params.id);
  return (
    <>
      <div className={styles.container}>
        <div>{data.title}</div>
        <div className={styles.author}>{data.author}</div>
        <img src={data.cover} alt="cover" className={styles.cover} />
        <MdEditorRt books={data.content}></MdEditorRt>
      </div>
    </>
  );
};
