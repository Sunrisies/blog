"use client";
import React, { useEffect, useState } from "react";
import { Table, Popconfirm, message } from "antd";
import { useImmer } from "use-immer";
import { useRequest } from "ahooks";
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
  const { data, pageSize, message, Code, page } = await getData();
  if (Code !== 200) {
    return new Error("请求错误");
  }
  return data;
};

const ArticleList = async () => {
  const articleList = await filterFetch();

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
      render: (_, record) =>
        articleList.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleDelete = (key: React.Key) => {
    const newData = articleList.filter((item) => item.key !== key);
    // setDataSource(newData);
  };
  console.log(articleList, "articleList");
  return (
    <>
      <Table rowKey={"id"} dataSource={articleList} columns={columns} />
    </>
  );
};

export default ArticleList;
