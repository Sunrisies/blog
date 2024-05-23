# FROM node:21.1.0
 
# ENV CORS_ORIGIN=http://localhost:6006
 
# RUN mkdir -p /var/publish/nest
 
# ADD ./ /var/publish/nest
 
# WORKDIR /var/publish/nest
 
# RUN npm install
 
# EXPOSE 3000
 
# CMD ["node","./dist/main.js"]


# 使用 Node.js 的官方镜像作为基础镜像  
# FROM node:lts-alpine  
# 使用最基础的 Alpine
FROM alpine:latest

# 自己安装 Node.js & npm
RUN apk add --no-cache --update nodejs npm yarn
# 设置工作目录  
WORKDIR /app  
  
# 将当前目录内容复制到容器的/app内  
COPY . /app  
RUN yarn 
# 配置 Nginx（假设您有一个名为 nginx.conf 的配置文件）  
# COPY nginx.conf /etc/nginx/nginx.conf  
# COPY ssl/blog.chaoyang1024.top.key /etc/nginx/ssl/chaoyang1024.top.key  
# COPY ssl/blog.chaoyang1024.top_bundle.crt /etc/nginx/ssl/chaoyang1024.top_bundle.crt  
  
# 确保 Nginx 的默认网站目录存在  
# RUN mkdir -p /var/www/html  
  
# 假设构建产物位于 /app/build，根据实际情况修改  
# RUN cp -r /app/public/* /var/www/html/  
  
# 对外暴露的端口号（Nginx 的端口）  
# EXPOSE 6006
  
# CMD ["sh", "-c", "node /app/dist/main.js"]
CMD ["sh", "-c", "yarn start"]