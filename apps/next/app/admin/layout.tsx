"use client";
import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

import Head from "next/head";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/components/Footer/footer";
import "@styles/globals.css";
import styles from "@/admin/globals.module.scss";
import NavBar from "@components/NavBar/index";
import Image from "next/image";
import bgImgLight from "@static/images/bg00005.jpeg";
import { ConfigProvider } from "antd";
const { Header, Content, Sider } = Layout;

type Item = {
  key: string;
  icon: React.ReactNode;
  label: string;
  path?: string;
};
const items: Item[] = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "文章列表",
    path: "admin/articles",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "分类管理",
    path: "admin/categories",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "标签管理",
    path: "admin/tags",
  },
  {
    key: "4",
    icon: <BarChartOutlined />,
    label: "评论管理",
    path: "admin/comments",
  },
  {
    key: "5",
    icon: <CloudOutlined />,
    label: "媒体管理",
    path: "admin/medias",
  },
  {
    key: "6",
    icon: <AppstoreOutlined />,
    label: "插件管理",
    path: "admin/plugins",
  },
  {
    key: "7",
    icon: <TeamOutlined />,
    label: "用户管理",
    path: "admin/users",
  },
  {
    key: "8",
    icon: <ShopOutlined />,
    label: "设置",
    path: "admin/settings",
  },
];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleMenuClick = (e: any) => {
    const key = e.key as string;
    const path = items.find((item) => item.key === key)?.path;
    path && router.push(path);
  };
  return (
    <html lang="zh">
      <Head>
        <link rel="icon" href="BlogIcon" />
      </Head>
      <body>
        <AntdRegistry>
          <Layout className={styles.layout}>
            <Sider
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <div className="demo-logo-vertical">12312</div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={items}
                onClick={handleMenuClick}
              />
            </Sider>
            <Layout style={{ marginLeft: 200, width: "100%" }}>
              <Header style={{ padding: 0, background: colorBgContainer }} />
              <div className={styles.content}>{children}</div>
              <Footer className={styles.footer} title="尾部"></Footer>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
