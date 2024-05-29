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
  const { data, message, code } = await getData();
  if (code !== 200) {
    return new Error("请求错误");
  }
  return data;
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
  } else {
    message.error(data.message);
  }
};

const ArticleList = async ({ dataSource }: { dataSource: any }) => {
  console.log("=1=1=1=", dataSource);
  //   const articleList = await filterFetch();

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
        dataSource.length >= 1 ? (
          <Popconfirm
            title="是否删除该文章?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleDelete = async (key: React.Key) => {
    deleteArticle(key as number);
    await filterFetch();
  };
  console.log(dataSource, "articleList");
  return (
    <>
      <Table rowKey={"id"} dataSource={dataSource} columns={columns} />
    </>
  );
};

export default ArticleList;
