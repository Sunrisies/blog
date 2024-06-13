"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { MdEditor, MdCatalog, MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import styles from "./edit.module.scss";
import { useImmer } from "use-immer";
import { publishArticle } from "@/utils/httpClient/apis/article.http";

const Page: React.FC = () => {
  const [person, updatePerson] = useImmer({
    title: "",
    content: "",
    category: "测试",
    tags: "测试",
    cover: "https://i.pravatar.cc/300",
    status: "发布",
    author: "朝阳",
    publish_time: "2021-01-01 00:00:00",
    update_time: "2021-01-01 00:00:00",
    views: 0,
    is_top: false,
    is_recommend: false,
    is_delete: false,
    is_publish: false,
    is_hide: false,
  });

  const release = async () => {
    const data =   await publishArticle(person);
    updatePerson((draft) => {
      draft.title = "";
      draft.content = "";
      draft.category = "测试";
      draft.tags = "测试";
      draft.cover = "";
      draft.status = "发布";
      draft.author = "朝阳";
      draft.publish_time = "2021-01-01 00:00:00";
      draft.update_time = "2021-01-01 00:00:00";
      draft.views = 0;
      draft.is_top = false;
      draft.is_recommend = false;
      draft.is_delete = false;
      draft.is_publish = false;
      draft.is_hide = false;
    });
  };
  const setTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(111, 2, 2, 1);
    updatePerson((draft) => {
      draft.title = e.target.value;
    });
  };
  const setContent = (value: string) => {
    updatePerson((draft) => {
      draft.content = value;
    });
  };
  const [id] = useState("preview-only");
  return (
    <>
      <div className={styles.edit_container}>
        <div className={styles.edit_header}>
          <Input
            placeholder="请输入文章标题"
            value={person.title}
            onChange={setTitle}
          />
          <Button type="primary" onClick={release}>
            发布
          </Button>
        </div>

        <MdEditor
          editorId={id}
          className={styles.md_editor_rt}
          modelValue={person.content}
          onChange={setContent}
        />
      </div>
    </>
  );
};
export default Page;
