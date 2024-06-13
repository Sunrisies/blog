import Menu from "@/components/menu";
import Me from "@/components/markdown";
import HomeMain from "@/components/HomeMain/Home";
import { readMarkdownFile } from "@/utils/markdown";
import MdEditorRt from "@/components/mdEditorRt/mdEditorRt";
import styles from "./id.module.scss";
import { getArticleDetail } from "@/utils/httpClient/apis/article.http";
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

export default async ({ params }: { params: searchParamsInterface }) => {
  const data = await getArticleDetail(+params.id)
  return (
    <>
      <div className={styles.container}>
        <div>{data.title}</div>
        <div className={styles.author}>{data.author}</div>
        <img src={data.cover} alt="cover" className={styles.cover} />
        <MdEditorRt books={data.content!}></MdEditorRt>
      </div>
    </>
  );
};
