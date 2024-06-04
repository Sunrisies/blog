"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { bindHandleScroll, removeScroll } from "@utils/elementUtils";
import { scrollTo } from "@utils/element";
import SysIcon from "@components/SysIcon";
import bgImgLight from "@static/images/bg00005.jpeg";
import { timeAixsList } from "@utils/dict";
import { loadingImag } from "@utils/dataImage";
import styles from "@styles/home.module.css";
import http from '@utils/httpClient/fetch'
const url = "http://123.207.197.182:3000/api/";
const url2 = "http://localhost:3001/api/";
const loginApi = async () => {
  http.post('login', {
    user_name: "朝阳",
    pass_word: "12345672",
  }).then(async(res) => {
    // console.log(await res.json(),'res')
  }).catch((err) => {
    // console.log(err,'err')
  })
  const res = await fetch(`${url}login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: "朝阳",
      pass_word: "1234567",
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // console.log(await res.json(), "/res");

  // return res.json();
};
export default function Home() {
  loginApi();

  const typeTarget = useRef<any>(null);
  const aboutDom = useRef<any>(null);

  const goAbout = () => {
    const aboutTop = aboutDom.current.offsetTop;
    scrollTo(aboutTop, {
      getContainer: () => document.body || window,
    });
  };

  useEffect(() => {
    bindHandleScroll();
    const typed = new Typed(typeTarget.current, {
      strings: [
        "浮世三千，吾爱有三，日月与卿，日为朝，月为暮，卿为朝朝暮暮",
        "I love three things in this world. Sun,",
        " moon and you. Sun for morning, moon for night , ",
        "and you forever",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      loopCount: Infinity,
      autoInsertCss: false,
      backDelay: 2000,
      showCursor: false,
    });

    return () => {
      removeScroll();
      typed.destroy();
    };
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.bg_mask} id="bg_mask" />
      <div className={styles.bg_content}>
        <div className={styles.title}>吾爱有三</div>
        <div className={styles.description_box}>
          <div className={styles.description} ref={typeTarget} />
        </div>
        <div className={styles.jiantou}>
          <SysIcon
            className={styles.jiantou_icon}
            type="icon-a-jiantou-xia"
            onClick={goAbout}
          />
        </div>
      </div>
      <div className={styles.page_box} ref={aboutDom}>
        <div className={styles.page_title}>GROWTH ABILITY</div>
        <div className={styles.page_desc}>博客项目更多功能入口</div>
        <div className={styles.page_list}>
          <div className={styles.page_item}>
            <Image
              className={styles.page_item_bg}
              width={2000}
              height={1320}
              src={
                "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg"
              }
              alt="必应每日壁纸"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={styles.page_item_link} href="/wallpaper">
              壁 纸
            </Link>
          </div>
          <div className={styles.page_item}>
            <Image
              className={styles.page_item_bg}
              width={2000}
              height={1320}
              src={
                "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg"
              }
              alt="热点"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={styles.page_item_link} href="/news">
              热 点
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.timeAixs_box}>
        <div className={styles.timeAixs_title}>GROWTH RECORD</div>
        <div className={styles.timeAixs_desc}>「 左右滑动查看 」</div>
        <div className={styles.timeAixs}>
          <div className={styles.timeAixs_left} />
          <div className={styles.timeAixs_content}>
            {timeAixsList?.map((v) => (
              <div className={styles.timeAixs_item} key={v.id}>
                <div className={styles.timeAixs_item_time}>{v.time}</div>
                <div className={styles.timeAixs_item_title}>{v.title}</div>
              </div>
            ))}
            <div className={styles.timeAixs_item}>
              <div className={styles.timeAixs_item_desc}>GROWING...</div>
              <div className={styles.timeAixs_item_desc}>COMING SOON</div>
            </div>
          </div>
          <div className={styles.timeAixs_right} />
        </div>
      </div>
    </div>
  );
}
