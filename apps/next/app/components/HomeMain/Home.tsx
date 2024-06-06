"use client";
import styles from "@/home.module.scss";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";
import { addLayoutNavStyle, removeLayoutNavStyle } from "@utils/elementUtils";
import { Article, ArticleList } from "@/types/article.type";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 700;
export default function Home({ list }: { list: ArticleList }) {
  const homeContainerRef = useRef<any>(null);
  // console.log(list,'list')
  const [ContainerHeight, setContainerHeight] = useState(0);
  const router = useRouter();
  useEffect(() => {
    addLayoutNavStyle();

    return () => {
      removeLayoutNavStyle();
    };
  }, []);
  useEffect(() => {
    if (homeContainerRef.current) {
      console.log(homeContainerRef.current, "homeContainerRef.current");
      setContainerHeight(homeContainerRef.current.offsetHeight);
    }
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1
    ) {
    }
  };
  const handleClick = (item: Article) => {
    router.push(`article/${item.id}`);
  };
  return (
    <div ref={homeContainerRef} className={styles.homeContainer}>
      {list.map((_) => (
        <div
          className={styles.listItem}
          onClick={() => handleClick(_)}
          key={_.id}
        >
          {_.title}
        </div>
      ))}
    </div>
  );
}
