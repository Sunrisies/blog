import { Metadata } from "next";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import "@styles/globals.css";
import styles from "./globals.module.scss";
import NavBar from "@components/NavBar/index";
import Image from "next/image";
import bgImgLight from "@static/images/bg00005.jpeg";
import { ConfigProvider } from "antd";
export const metadata: Metadata = {
  title: "朝阳的博客",
  description: "朝阳的个人博客站，旨在记录生活，分享知识",
  keywords: ["朝阳博客", "朝阳的博客", "朝阳", "博客", "个人博客"],
  authors: [{ name: "朝阳", url: "https://blog.chaoyang1024.top/about" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        {/* <ConfigProvider direction="rtl"> */}
        <AntdRegistry>
          <div className={styles.main}>
            <div className={styles.bg_card}>
              <Image
                className={styles.bg_card_img}
                width={2000}
                height={1000}
                src={bgImgLight}
                alt="blog-bg"
                priority={true}
              />
            </div>
            <NavBar />
            <div className={styles.container}>{children}</div>

            {/* <Header className={styles.header}></Header> */}
            {/* <div className={styles.container}>{children}</div>*/}
            <Footer className={styles.footer} title="尾部"></Footer>
          </div>
        </AntdRegistry>
        {/* </ConfigProvider> */}
      </body>
    </html>
  );
}
