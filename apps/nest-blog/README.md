- 使用docker 启动命令 
- - `docker run --name nest-mysql -p 9906:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0.3`


-  @nestjs/typeorm typeorm mysql2 安装命令
- - `pnpm i @nestjs/typeorm typeorm mysql2 --save`

-- 校验 pnpm i joi --save

-- 安装 class-validator class-transformer --save


- 2024.4.17
  - 项目名称：nest-blog
  - 项目描述：基于nest.js的博客系统

  - 项目作者：zhuzhongqian

  - 项目版本：1.0.0

  - 项目初始化日期：2024.4.17
  
  - 添加功能：
    - 完成格式化的规范化
    - 添加了mysql数据库

  - 添加文章模块 2024.5.26
  - 初步完成登录接口跟注册接口 2024.5.30
  - 完成docker部署mysql 2024.6.3

- 2024.4.26
  - 初步添加文章模块

- 功能：
  - 文章模块
  - 大文件上传
  - 照片存储以及返回
  - 注册模块
  - 登录模块
  - 邮箱验证模块

  /etc/profile.d/lang.sh
