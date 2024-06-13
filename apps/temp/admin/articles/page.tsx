"use client";

// import React from "react";
// import Table from './table'
// async function getData() {
//   // const res = await fetch("http://123.207.197.182:80/api/article", {
//   //   cache: "no-cache",
//   // });
//   const res = await fetch("http://localhost:80/api/article", {
//     cache: "no-cache",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }
// const filterFetch = async () => {
//   const { data, message, code } = await getData();
//   if (code !== 200) {
//     return new Error("请求错误");
//   }
//   return data;
// };

// const ArticleList = async () => {
//   const articleList = await filterFetch();
//   return (
//     <>
//       <Table dataSource={articleList} />
//     </>
//   );
// };

// export default ArticleList;

import React, { useEffect, useState } from "react";
import { Table, Popconfirm, message } from "antd";
import { useImmer } from "use-immer";
import { setTimeout } from "timers/promises";
async function getData() {
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
}
const filterFetch = async () => {
  const { data, message, code } = await getData();
  if (code !== 200) {
    return new Error("请求错误");
  }
  return data;
};



const ArticleList = () => {
  // console.log("=1=1=1=", dataSource);
  const [dataSource, setDataSource] = useImmer([]);
  // const { data, loading, error } = useRequest(filterFetch, {
  // const articleList = await filterFetch();
  // filterFetch().then((data) => {
  //   // setDataSource(data);
  //   setDataSource((draft) => {
  //     draft.splice(0, draft.length);
  //     console.log(draft, "draft");
  //     // draft.push(...data);
  //     console.log(data, "data");
  //   })
  //   console.log(data, "data");
  // })
  useEffect(() => {
    console.log("useEffect articleList");
    getArticleList();
  }, []);
  const getArticleList = async () => {
    const articleList = await filterFetch();
    console.log(articleList, "articleList");
    setDataSource(articleList);
  };
  const deleteArticle = async (id: number) => {
    const res = await fetch(`http://localhost:80/api/article/${id}`, {
      method: "DELETE",
      cache: "no-cache",
    });
    console.log(res, "res");
    if (!res.ok) {
      throw new Error("Failed to delete data");
    }
    let data = await res.json();
    if (data.code === 200) {
      message.success(data.message);
      getArticleList()
    } else {
      message.error(data.message);
    }
  };

  const columns = [
    {
      title: "文章标题",
      dataIndex: "title",
      key: "id",
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "address",
      dataIndex: "address",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_:any, record:any) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleDelete = async (key: React.Key) => {
    console.log(key, "key");
    deleteArticle(key as number);
    // const newData = await filterFetch();
    // console.log(newData, "newData");

    // setDataSource(newData);
  };
  // console.log(dataSource, "articleList");
  return (
    <>
      <Table rowKey={"id"} dataSource={dataSource} columns={columns} />
    </>
  );
};

export default ArticleList;
